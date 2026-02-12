import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor minimo de ${errors['min'].min}`;

        case 'email':
          return 'Debe introducir un email valido';

        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return `Debe ser un email válido`;
          }
          return 'Error de patron contra expresión regular';

        default:
          return 'Error de validacion no controlado';
      }
    }
    return null;
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const fieldValue = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return fieldValue === field2Value ? null : { passwordsNotEqual: true };
    };
  }
}
