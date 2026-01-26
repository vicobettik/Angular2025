import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
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

  searchByCountry(query:string):Observable<Country[]>{
    const lowercaseQuery = query.toLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/name/${lowercaseQuery}`)
      .pipe(
        map((res) => {
          return CountryMapper.mapRestCountryArrayToCountryArray(res);
        }),
        delay(2000),
        catchError((error) => {
          return throwError(() => {
            return new Error(`no se pueden obtener paises con ese query:${query}`);
          })
        })
      )
  };

  searchCountryByAlphaCode(query:string):Observable<Country|undefined>{

    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${query}`)
      .pipe(
        map((res) => {
          return CountryMapper.mapRestCountryArrayToCountryArray(res);
        }),
        map((countries) => {
          return countries.at(0)
        }),
        catchError((error) => {
          return throwError(() => {
            return new Error(`no se pueden obtener un pais con ese query:${query}`);
          })
        })
      )
  };


}
