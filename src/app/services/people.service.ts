import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {People} from '../shared/interfaces';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PeopleService {
  constructor(private http: HttpClient) {
  }

  public getPeople(): Observable<People[]> {
    return this.http.get<People[]>(`${environment.http}/people/`, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public createPeople(people: FormData): Observable<People> {
    return this.http.post<People>(`${environment.http}/people/`, people, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
  }

  public updatePeople(people: FormData): Observable<People> {
    return this.http.put<People>(`${environment.http}/people/`, people, {
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
}
