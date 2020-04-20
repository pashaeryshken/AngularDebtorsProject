import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {from} from 'rxjs';
import {AuthGoogleService} from '../../services/auth/auth-google.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmit: boolean = false;

  constructor(public auth: AuthService, private authGoogleService: AuthGoogleService, private router: Router, private ngZone: NgZone) {
    this.authGoogleService.authInit();
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

  public signInGoogle(): void {
    this.isSubmit = true;
    this.authGoogleService.googleSign().subscribe(() => {
      this.isSubmit = false;
      this.ngZone.run(() => this.router.navigate(['/debtors']).then()).then();
    }, () => {
      this.isSubmit = false;
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
