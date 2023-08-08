import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { data } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(): Observable<Array<{ [key: string]: any; }>> {
    return of(data);
  }
}
