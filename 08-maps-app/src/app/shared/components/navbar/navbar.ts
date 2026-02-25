import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);

  routes = routes
    .map((route) => {
      return {
        path: route.path,
        title: `${route.title ?? 'Maps en Angular'}`,
      };
    })
    .filter((route) => route.path != '**');

pageTitle = toSignal(
  this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => {
      // 1. Buscamos el objeto de ruta que coincida con la URL
      const routeFound = routes.find((r) => `/${r.path}` === event.url);

      // 2. Extraemos el título o usamos el default
      const title = routeFound?.title ?? 'Mapas';

      console.log('Título encontrado:', title);

      // 3. ESTE return es el que el Signal recibe
      return title;
    })
  ),
  { initialValue: 'Mapas' } // Para que no empiece vacío al cargar
);


}
