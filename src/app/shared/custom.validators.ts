import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  public static confirmPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password: string = control.get('password').value;
    const confPass: string = control.get('conf_pass').value;
    return password === confPass ? null : {noConfirm: true};
  };

  public static dateValidate: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const dateStart: string = control.get('dateStart').value;
    const dateEnd: string = control.get('dateEnd').value;
    const date: number = Date.parse(dateStart) - Date.parse(dateEnd);
    return date <= 0 ? null : {inValidDate: true};
  };

  public static dateValidateHistory(minDate: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date: string = control.value;
      const isValid: number = Date.parse(minDate) - Date.parse(date);
      return isValid <= 0 ? null : {invalidDate: true};
    };
  }
}
