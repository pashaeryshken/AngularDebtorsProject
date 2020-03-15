import {AbstractControl, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  static confirmPassword(pass: string): ValidatorFn {
   return (control: AbstractControl): {[key: string]: any} | null => {
     console.log('asdasd');
     const isConfirm = pass !== control.value;
     return isConfirm ? { confirmPass : {value : control.value} } : null;
   };
  }
}
