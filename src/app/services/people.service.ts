import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DebtorsResponse, People} from '../shared/interfaces';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {DebtorsService} from './debtors.service';

@Injectable({providedIn: 'root'})
export class PeopleService {
  constructor(private http: HttpClient, private debtorsService: DebtorsService) {
  }

  public getPeople(): Observable<People[]> {
    return this.http.get<People[]>(`${environment.http}/people/`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public createPeople(people: People | FormData): Observable<People> {
    return this.http.post<People>(`${environment.http}/people/`, people, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public removePeople(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.http}/people/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public addPeoplesAndDebtors(people: People | FormData, debtor: DebtorsResponse): Observable<DebtorsResponse> {
    return this.http.post<People>(`${environment.http}/people/`, people, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).pipe(
      switchMap((item: People) => {
        return this.debtorsService.setDebtor({...debtor, peopleId: item._id});
      })
    );
  }
}
