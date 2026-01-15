import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from '../../services/gifs.service';


interface MenuOption {
  label: string;
  subLabel: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'gif-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css'
})
export class SideMenuOptionsComponent {

  gifsService = inject(GifsService);
  searchHistoryKeys = this.gifsService.searchHistoryKeys;

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs populares',
      router: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      router: '/dashboard/search'
    }
  ]

}
