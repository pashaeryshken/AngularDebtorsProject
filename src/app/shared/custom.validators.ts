<<<<<<< HEAD
<<<<<<< HEAD
import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
=======
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
>>>>>>> Revert "finaly commit"
=======
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
=======
import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
>>>>>>> master
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273

export class CustomValidators {
  public static confirmPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password: string = control.get('password').value;
    const confPass: string = control.get('conf_pass').value;
<<<<<<< HEAD
<<<<<<< HEAD
    return password === confPass ? null : { noConfirm: true};
=======
    return password === confPass ? null : {noConfirm: true};
  }

  public static dateValidate: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const dateStart: string = control.get('dateStart').value;
    const dateEnd: string = control.get('dateEnd').value;
    const date: number = Date.parse(dateStart) - Date.parse(dateEnd);
    return date <= 0 ? null : {inValidDate : true};
>>>>>>> Revert "finaly commit"
=======
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
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273
  }
}
