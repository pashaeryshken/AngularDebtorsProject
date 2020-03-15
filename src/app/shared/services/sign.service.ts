import {Injectable} from '@angular/core';
import {AuthResponse, SignData} from '../interfaces';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
  })
export class SignService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  sign(signData: SignData): Observable<AuthResponse> {
    return this.http.post('http://localhost:3333/users/signup', signData)
      .pipe(
        tap(this.auth.setToken)
      );
  }
}
