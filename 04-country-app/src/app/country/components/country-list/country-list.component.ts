import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { isEmpty } from 'rxjs';

@Component({
  selector: 'country-country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {

  countries = input<Country[]>([]);

  errorMessage = input<string|unknown|null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

}
