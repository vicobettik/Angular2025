import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/formUtils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
  styleUrl: './basic-page.css',
})
export class BasicPage {
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  // name: ['',/** validadores sincronos */,/** validadores asincronos */],
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [null, [Validators.required, Validators.min(10)]],
    inStorage: [null, [Validators.required, Validators.min(10)]],
  });




  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({
      price: null,
      inStorage: null,
      name: '',
    });
  }
}
