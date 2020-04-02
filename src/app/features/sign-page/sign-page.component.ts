import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignService} from '../../services/sign.service';
import {SignData} from '../../shared/interfaces';
import {Router} from '@angular/router';
import {CustomValidators} from '../../shared/custom.validators';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {

  public signForm: FormGroup;
  public isSubmit: boolean = false;

  constructor(private sign: SignService, private router: Router) {
  }

  public ngOnInit(): void {
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
      password: new FormGroup({
        password: new FormControl(null,
          [
            Validators.required,
            Validators.minLength(6)
          ]),
        conf_pass: new FormControl(null,
          [
            Validators.required,
            Validators.minLength(6),
          ])
      }, [
        CustomValidators.confirmPassword
      ])
    });
  }

  public submit(): void {
    if (this.signForm.valid) {
      const signData: SignData = {
        userName: this.signForm.value.userName,
        email: this.signForm.value.email,
        password: this.signForm.value.password.password
      };
      this.isSubmit = true;
      this.sign.sign(signData).subscribe(() => {
        this.signForm.reset();
        this.isSubmit = false;
        this.router.navigate(['/debtors']);
      },
      err => {
        this.isSubmit = false;
      });
    }
  }
}
