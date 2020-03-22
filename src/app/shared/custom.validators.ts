import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  static confirmPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const pass = control.get('pass').value;
    const confPass = control.get('conf_pass').value;
    console.log(pass === confPass);
    return pass === confPass ? null : { noConfirm: true};
  }
}

