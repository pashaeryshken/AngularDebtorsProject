import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DebtHistory} from '../shared/interfaces';

@Injectable({providedIn: 'root'})

export class HistoryDebtService {

  constructor(private http: HttpClient) {
  }


  public removeHistoryField(historyId: string, debtId: string): Observable<void> {
    return this.http.delete<void>(`${environment.http}/debtors/history/${debtId}/${historyId}`, {
      headers: {
        token: localStorage.token
      }
    });
  }

  public addHistoryField(debtId: string, history: DebtHistory): Observable<DebtHistory> {
    return this.http.post<DebtHistory>(`${environment.http}/debtors/history`, {debtId, history}, {
      headers: {
        token: localStorage.token
      }
    });
  }

}
