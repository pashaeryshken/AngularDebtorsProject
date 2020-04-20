import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmit: boolean = false;

  constructor(public auth: AuthService, private router: Router) {
  }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)])
    });
  }

  public submit(): void {
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
