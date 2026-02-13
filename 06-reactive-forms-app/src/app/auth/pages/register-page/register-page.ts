import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/formUtils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)],[this.formUtils.checkingServerResponse]],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.notVico
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')],
    },
  );



  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
