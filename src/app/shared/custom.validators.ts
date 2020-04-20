<<<<<<< HEAD
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
=======
import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
>>>>>>> master

export class CustomValidators {
  public static confirmPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password: string = control.get('password').value;
    const confPass: string = control.get('conf_pass').value;
<<<<<<< HEAD
    return password === confPass ? null : {noConfirm: true};
  }

  public static dateValidate: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const dateStart: string = control.get('dateStart').value;
    const dateEnd: string = control.get('dateEnd').value;
    const date: number = Date.parse(dateStart) - Date.parse(dateEnd);
    return date <= 0 ? null : {inValidDate : true};
=======
    return password === confPass ? null : { noConfirm: true};
>>>>>>> master
  }
}
