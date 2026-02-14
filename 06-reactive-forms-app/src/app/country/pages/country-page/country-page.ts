import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { catchError, filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css',
})
export class CountryPage {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect((onCleanUp) => {
    const regionSuscription = this.onRegionChanged();
    const countrySusctiption = this.onCountryChanged();

    onCleanUp(() => {
      regionSuscription?.unsubscribe();
      countrySusctiption.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => this.myForm.get('border')?.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) => {
          return this.countryService.getCountriesByRegion(region!)
          .pipe(
            catchError((error) => {
              console.log(error)
              return of([])
            })
          )
        })
      )
      .subscribe((countries) => {
        console.log(countries)
        this.countriesByRegion.set(countries);
      });
  };

  onCountryChanged(){

    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter((value) => value!.length > 0),
      switchMap((countryCode) => this.countryService.getCountryByAlphaCode(countryCode!)
        .pipe(
          catchError((error) => of(null))
        )
      ),
      switchMap((country) => {
        if (!country || !country.borders || country.borders.length === 0) {
          return ([]);
        }
        return this.countryService.getCountryNamesByCountryCodes(country?.borders)
      })
    )
    .subscribe((countries) => {
      this.borders.set(countries);
    })

  }
}
