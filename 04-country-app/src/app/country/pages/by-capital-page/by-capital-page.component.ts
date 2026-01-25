import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { RestCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  onSearch(value:string){
    this.query.set(value);
  }

  countryResource = resource({

    request: () => ({query: this.query()}),
    loader: async({}) => {
      if (!this.query()) {
        return [];
      }

    }
  })

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(value: string) {
  //   if (this.isLoading()) {
  //     return;
  //   }
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCaptal(value).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err)
  //     }
  //   });
  // }
}
