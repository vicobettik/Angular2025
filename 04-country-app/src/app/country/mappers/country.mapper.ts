import { Country } from '../interfaces/country.interface';
import { RestCountry } from '../interfaces/rest-countries.interface';


export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      capital: restCountry.capital.join(','),
      population: restCountry.population,
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: RestCountry[]):Country[] {

    return restCountries.map((item) => {
      return this.mapRestCountryToCountry(item);
    });

  }

}
