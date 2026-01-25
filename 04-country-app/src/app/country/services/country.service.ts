import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCaptal(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    return this.http
      .get<RestCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`)
      .pipe(
        map((res) => {
          return CountryMapper.mapRestCountryArrayToCountryArray(res);
        }),
        catchError((err) => {
          console.log('Error fetching', err);
          return throwError(() => {
            return new Error(`no se pueden obtener paises con ese query:${query}`);
          })
        })
      );
  }
}
