import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { IS_PUBLIC } from '../interceptors/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = 'https://dummyjson.com/auth';
  private readonly TOKEN_KEY = 'token';

  /**
   * Realiza el inicio de sesión.
   * Usamos IS_PUBLIC para que el interceptor no intente añadir un token inexistente.
   */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials, {
      context: new HttpContext().set(IS_PUBLIC, true)
    }).pipe(
      tap(res => this.setToken(res.accessToken)) // Si es exitoso, guardamos el token
    );
  }

  /**
   * Verifica si el token actual es válido preguntando a la API.
   * Este es el método que usará tu Guard.
   */
  checkTokenStatus(): Observable<boolean> {
    const token = this.getToken();

    // Si ni siquiera hay token guardado, no perdemos tiempo llamando a la API
    if (!token) return of(false);

    return this.http.get(`${this.API_URL}/me`).pipe(
      map(() => {
        return true;
      }), // La API respondió 200 OK, el token es válido
      catchError((err) => {
        console.log(err)
        this.logout(); // Hubo un error (401), el token no sirve
        return of(false);
      })
    );
  }

  /**
   * Elimina el token y redirige al login.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Métodos de utilidad para manejar el localStorage
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}
