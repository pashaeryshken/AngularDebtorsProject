import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, User} from '../interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();
  isRefreshToken = true;

  constructor(private http: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(user: User): Observable<AuthResponse> {
    user.email = user.email.trim();
    return this.http.post<AuthResponse>('http://localhost:3333/users/login', user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
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
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    if (!!error.error.message) {
      this.error$.next('Введите корректные данные');
    }
    return throwError(error);
  }

  private refreshToken(): Observable<AuthResponse> {
    console.log('refreshToken');
    const token = localStorage.getItem('token');
    return this.http.get<AuthResponse>('http://localhost:3333/users/refresh-token', {
      headers: {
        token
      }
    }).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  public setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + (+response.expiresIn) * 1000);
      const refreshTokenDate = new Date(new Date().getTime() + (+response.expiresIn - 600) * 1000);
      localStorage.setItem('token', response.token);
      localStorage.setItem('token-exp', expDate.toString());
      localStorage.setItem('token-refresh', refreshTokenDate.toString());
    } else {
      localStorage.clear();
    }
  }

  public userData() {
    const token = localStorage.getItem('token');
    return this.http.get('http://localhost:3333/users/', {
      headers: {
        token
      }
    });
  }
}
