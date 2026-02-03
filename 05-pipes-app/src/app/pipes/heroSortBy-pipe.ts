import { Pipe, signal, type PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroSortBy',
})
export class HeroSortByPipe implements PipeTransform {

  transform(value: Hero[], sortBy: keyof Hero | null): Hero[] {

    if (!sortBy) {
      return value;
    }

    return [...value].sort((a,b) => {
      if (typeof a[sortBy] == 'string' && typeof b[sortBy] == 'string') {
        return a[sortBy].localeCompare(b[sortBy]);
      }

      return (a[sortBy] > b[sortBy]) ? -1 : 1;

    });


  }

}
