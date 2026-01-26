import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {

  value = output<string>();
  placeHolder = input('Buscar');
  debounceTime = input(300);

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanUp(() => {
      clearTimeout(timeout);
    })
  })


  onSearch(query:string) {
    this.inputValue.set(query);
  }

}
