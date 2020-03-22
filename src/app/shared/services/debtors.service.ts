import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DebtorsResponse} from '../interfaces';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DebtorsService {

  option = {
    headers: {
      token: localStorage.getItem('token')
    }
  };


  constructor(private http: HttpClient) {
  }

  getDebtors(): Observable<DebtorsResponse[]> {
    return this.http.get<DebtorsResponse[]>('http://localhost:3333/debtors/', this.option);
  }

  removeDebtor(id: string): Observable<any> {
    console.log(id);
    return this.http.delete<any>(`http://localhost:3333/debtors/${id}`, this.option);
  }

  setStatus(id: string): Observable<any> {
    console.log(id);
    return this.http.put<any>('http://localhost:3333/debtors/', {
      id,
      status: 2
    }, this.option);
  }
/*  //??????????????????????????????????????????????????????*/
  setDebtor(debtor: {}): Observable<any> {
    return this.http.post<any>('http://localhost:3333/debtors/create', debtor, this.option);
  }


}
