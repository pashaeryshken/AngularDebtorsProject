import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  public static confirmPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password: string = control.get('password').value;
    const confPass: string = control.get('conf_pass').value;
    return password === confPass ? null : { noConfirm: true};
  }
}
