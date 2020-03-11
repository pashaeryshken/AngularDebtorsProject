import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces';
import {AuthServices} from '../shared/services/auth.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  isSubmit = false;

  constructor(public auth: AuthServices, private router: Router) {
  }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)])
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.isSubmit = true;
      const user: User = {...this.loginForm.value};
      this.auth.login(user).subscribe(() => {
        this.loginForm.reset();
        this.isSubmit = false;
        this.router.navigate(['/debtors']);
      }, () => {
        this.isSubmit = false;
      });
    }
  }
}
