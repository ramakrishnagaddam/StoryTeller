import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  AUTH_SERVER = environment.API;
  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  fetch(url): Observable<any> {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Accept', 'application/json');
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/${url}`, { headers } );
  }

  create(url: string, data: FormData) {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/${url}`, data);
  }

  createByJson(url: string, data: any) {
    const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Accept', 'application/json');
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/${url}`, data, { headers });
  }
}
