import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DebtorsResponse, UpdateDebtor} from '../shared/interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DebtorsService {

  constructor(private http: HttpClient) {
  }

  public getDebtors(): Observable<DebtorsResponse[]> {
    return this.http.get<DebtorsResponse[]>(`${environment.http}/debtors/`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public removeDebtor(id: string): Observable<null> {
    console.log(id);
    return this.http.delete<null>(`${environment.http}/debtors/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public UpdateDebtor(debtor: DebtorsResponse): Observable<DebtorsResponse> {
    return this.http.put<DebtorsResponse>(`${environment.http}/debtors/`, debtor, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public setDebtor(debtor: DebtorsResponse): Observable<DebtorsResponse> {
    return this.http.post<DebtorsResponse>(`${environment.http}/debtors/create`, debtor, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public getDebtor(id: number): Observable<DebtorsResponse> {
    return this.http.get<DebtorsResponse>(`${environment.http}/debtors/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }
}
