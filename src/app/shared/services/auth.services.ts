import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, User} from '../interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthServices {

  public error$: Subject<string> = new Subject<string>();
  isRefreshToken = true;

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    const refreshToken = new Date(localStorage.getItem('token-refresh'));
    if (new Date() > refreshToken) {
      if (new Date() > expDate) {
        this.logout();
        return null;
      }
      if (this.isRefreshToken) {
        this.isRefreshToken = false;
        this.refreshToken().subscribe(() => {
          this.isRefreshToken = true;
        });
      }
    }
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:3333/users/login', user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    if (!!error.error.message) {
      this.error$.next('Введите корректные данные');
    }
    return throwError(error);
  }

  private refreshToken(): Observable<any> {
    console.log('refreshToken');
    const token = localStorage.getItem('token');
    return this.http.get('http://localhost:3333/users/refresh-token', {
      headers: {
        token
      }
    }).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      const refreshTokenDate = new Date(new Date().getTime() + (+response.expiresIn - 600) * 1000);
      localStorage.setItem('token', response.token);
      localStorage.setItem('token-exp', expDate.toString());
      localStorage.setItem('token-refresh', refreshTokenDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
