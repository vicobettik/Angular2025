import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes';
import { CanFlyPipe } from '../../pipes/canFly.pipe';
import { HeroColorPipe } from '../../pipes/heroColor.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipes/heroCreator-pipe';
import { HeroSortByPipe } from '../../pipes/heroSortBy-pipe';
import { Hero } from '../../interfaces/hero.interface';
import { HeroFilterPipe } from '../../pipes/heroFilter-pipe';

@Component({
  selector: 'app-custom-page',
  imports: [HeroCreatorPipe, HeroFilterPipe, HeroSortByPipe,ToggleCasePipe, CanFlyPipe, HeroColorPipe, TitleCasePipe],
  templateUrl: './custom-page.html',
  styleUrl: './custom-page.css',
})
export class CustomPage {
  name = signal('Victor Fuentes Menes');
  uppercase = signal(true);
  heroes = signal(heroes);
  sortBy = signal<keyof Hero | null>(null)
  searchQuery = signal('');

  toggleCase(): void {
    this.uppercase.update((prev) => {
      return !prev;
    });
  };

  setSortBy(value: keyof Hero | null){
    this.sortBy.set(value);
  }

  setSearchQuery(value: string){
    this.searchQuery.set(value);
  }

}
