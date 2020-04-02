import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, User, UserData} from '../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(): string {
    return localStorage.getItem('token');
  }

  public error$: Subject<string> = new Subject<string>();
  public isRefreshToken: boolean = true;

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (!!error.error.message) {
      this.error$.next('Введите корректные данные');
    }
    return throwError(error);
  }

  private refreshToken(): Observable<AuthResponse> {
    console.log('refreshToken');
    const token: string = localStorage.getItem('token');
    return this.http.get<AuthResponse>('http://localhost:3333/users/refresh-token', {
      headers: {
        token
      }
    }).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  public login(user: User): Observable<AuthResponse> {
    user.email = user.email.trim();
    return this.http.post<AuthResponse>('http://localhost:3333/users/login', user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  public logout(): void {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    const expDate: Date = new Date(localStorage.getItem('token-exp'));
    const refreshToken: Date = new Date(localStorage.getItem('token-refresh'));
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

  public setToken(response: AuthResponse | null): void {
    if (response) {
      const expDate: Date = new Date(new Date().getTime() + (+response.expiresIn) * 1000);
      const refreshTokenDate: Date = new Date(new Date().getTime() + (+response.expiresIn - 600) * 1000);
      localStorage.setItem('token', response.token);
      localStorage.setItem('token-exp', expDate.toString());
      localStorage.setItem('token-refresh', refreshTokenDate.toString());
    } else {
      localStorage.clear();
    }
  }

  public userData(): Observable<UserData> {
    const token: string = localStorage.getItem('token');
    return this.http.get<UserData>('http://localhost:3333/users/', {
      headers: {
        token
      }
    });
  }
}
