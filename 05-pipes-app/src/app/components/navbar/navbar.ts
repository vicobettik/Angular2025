import { ChangeDetectionStrategy, Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {

  routes = routes.map((route) => {
    return ({
      title:route.title ?? '',
      path:route.path ?? ''
    });
  });

}
