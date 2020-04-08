import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DebtorsResponse, UpdateDebtor} from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class DebtorsService {


  constructor(private http: HttpClient) {
  }

  public getDebtors(): Observable<DebtorsResponse[]> {
    return this.http.get<DebtorsResponse[]>('http://localhost:3333/debtors/', {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public removeDebtor(id: string): Observable<null> {
    console.log(id);
    return this.http.delete<null>(`http://localhost:3333/debtors/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public UpdateDebtor(debtor: UpdateDebtor): Observable<UpdateDebtor> {
    return this.http.put<UpdateDebtor>('http://localhost:3333/debtors/', debtor, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public setDebtor(debtor: FormData | DebtorsResponse): Observable<DebtorsResponse> {
    return this.http.post<DebtorsResponse>('http://localhost:3333/debtors/create', debtor, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public getDebtor(id): Observable<DebtorsResponse>{
    return this.http.get<DebtorsResponse>(`http://localhost:3333/debtors/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }
}
