import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {SignService} from '../../shared/services/sign.service';
import {SignData} from '../../shared/interfaces';
import {Router} from '@angular/router';
import {CustomValidators} from '../../shared/custom.validators';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {

  signForm: FormGroup;
  isSubmit = false;

  constructor(private sign: SignService, private router: Router) {
  }

  ngOnInit(): void {
    this.signForm = new FormGroup({
      userName: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3)
        ]),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormGroup( {
        pass: new FormControl(null,
          [
            Validators.required,
            Validators.minLength(6)
          ]),
        conf_pass: new FormControl(null,
          [
            Validators.required,
            Validators.minLength(6),
          ]),
      }, [CustomValidators.confirmPassword])
    });
  }
  private passEqual(): ValidatorFn {
    return (control: FormControl) => {
      return (!control.dirty && !control.touched) ||
      this.signForm.get('pass').value === this.signForm.get('conf_pass').value ?
        null :
        {custom: 'пароли не совпадают'};
    };
  }

  submit() {
    console.log(this.signForm.get('password'));
    if (this.signForm.valid) {
      if (this.signForm.value.password === this.signForm.value.confPassword) {
        console.log('good');
        const signData: SignData = {
          userName: this.signForm.value.userName,
          email: this.signForm.value.email,
          password: this.signForm.value.pass
        };
        this.isSubmit = true;
        this.sign.sign(signData).subscribe(() => {
          this.signForm.reset();
          this.isSubmit = false;
          this.router.navigate(['/debtors']);
        });
      }
    }
  }
}
