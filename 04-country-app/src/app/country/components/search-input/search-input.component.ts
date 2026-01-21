import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {

  value = output<string>();
  placeHolder = input('Buscar')


  onSearch(query:string) {
    this.value.emit(query);
  }

}
