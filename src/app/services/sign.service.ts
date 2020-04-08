import {Injectable} from '@angular/core';
import {AuthResponse, SignData} from '../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(error.error)
    switch (error.error.message) {
      case 'USER_EXISTS': {
        this.error$.next('Email уже занят');
        break;
      }
      default: this.error$.next('');
    }
    return throwError(error);
  }

  public sign(signData: SignData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3333/users/signup', signData)
      .pipe(
        tap(this.auth.setToken),
        catchError(this.handleError.bind(this))
  );
  }
}
