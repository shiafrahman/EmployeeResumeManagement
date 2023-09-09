import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validPattern(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => 
    {
      const valid = reg.test(control.value);
      return valid ? null : {invalidPattern: true};
    };
  }