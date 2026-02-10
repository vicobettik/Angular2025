import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {
  static fieldHasErrors(form: FormGroup, fieldName: string): boolean {
    return !!(form.get(fieldName)?.errors && form.get(fieldName)?.touched);
  }

  static itHasErrorsFieldInArray(formArray: FormArray, index: number) {
    return !!(formArray.at(index).errors && formArray.at(index).touched);
  }

  static getFielinArraydError(form: FormArray, index: number): string | null {
    if (!form.at(index)) {
      return null;
    }

    const errors = form.at(index)?.errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.get(fieldName)) {
      return null;
    }

    const errors = form.get(fieldName)?.errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static getTextError(errors:ValidationErrors) {

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
      }
    }
    return null;
  };

}
