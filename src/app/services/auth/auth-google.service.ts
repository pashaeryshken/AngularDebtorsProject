import {Injectable} from '@angular/core';
import {from, Observable, Subject, throwError} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../../environments/environment';
// @ts-ignore
import GoogleUser = gapi.auth2.GoogleUser;
import {AuthResponse} from '../../shared/interfaces';

@Injectable({providedIn: 'root'})
export class AuthGoogleService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(error);
    if (!!error.error.message) {
      this.error$.next('Введите корректные данные');
    }
    return throwError(error);
  }

  public authInit(): void {
    // @ts-ignore
    gapi.load('auth2', () => {
      // @ts-ignore
      from(gapi.auth2.init({
        client_id: environment.googleKey
      })).subscribe(() => {
        console.log('init OK');
      });
    });
  }


  public googleSign(): Observable<AuthResponse> {
    // @ts-ignore
    return from(gapi.auth2.getAuthInstance().signIn({scope: 'profile email'})).pipe(
      catchError(this.handleError.bind(this))
    ).pipe(
      switchMap((user: GoogleUser) => {
        return this.apiSign(user);
      })
    );
  }

  public apiSign(user: GoogleUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.http}/users/login-google`, {
      email: user.getBasicProfile().getEmail(),
      userName: user.getBasicProfile().getName()
    }).pipe(
      tap(this.authService.setToken),
      catchError(this.handleError.bind(this))
    );
  }
}
