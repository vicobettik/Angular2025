import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const authdGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkTokenStatus()
    .pipe(
      take(1),
      map((isValid) => {
        if (isValid) {
          return true;
        }
        else{
          router.navigate(['/login']);
          return false;
        }
      })
    )

};
