import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DebtorsService {
  constructor(private http: HttpClientModule) {
  }
}
