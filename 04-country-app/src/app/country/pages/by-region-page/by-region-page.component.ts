import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/rest-countries.interface';
import { of } from 'rxjs';



@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);

  query = signal<Region|null>(null);

  changeRegion(value:Region){
    this.query.set(value);
  }

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!this.query()) {
        return of([])
      }
      return this.countryService.searchByRegion(this.query()!);
    },
  });
}
