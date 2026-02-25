import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = signal('');
  isLoading: boolean = false;

  loginForm = this.fb.group({
    username: ['emilys', [Validators.required]],
    password: ['emilyspass', [Validators.required]],
  });

    login() {
      if (this.loginForm.invalid) {
        return;
      }
      console.log(this.loginForm.value);
      // Llamamos al servicio que creamos antes
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('¡Login exitoso!', response);
          this.isLoading = false;
          // El servicio ya guardó el token mediante el operador 'tap'
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err)
          this.errorMessage.set(err.error?.message || 'Usuario o contraseña incorrectos');
        },
      });
    }
}
