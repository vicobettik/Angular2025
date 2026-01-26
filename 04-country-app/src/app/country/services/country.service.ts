import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string,Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http
      .get<RestCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`)
      .pipe(
        map((res) => {
          return CountryMapper.mapRestCountryArrayToCountryArray(res);
        }),
        tap((countries) => {
          this.queryCacheCapital.set(query,countries)
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

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? [])
        .pipe(
          delay(2000)
        )
    }

    return this.http.get<RestCountry[]>(`${API_URL}/name/${lowercaseQuery}`)
      .pipe(
        map((res) => {
          return CountryMapper.mapRestCountryArrayToCountryArray(res);
        }),
        tap((countries) => {
          this.queryCacheCountry.set(query,countries);
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
