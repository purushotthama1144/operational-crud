import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  baseUrl = "http://192.168.132.225:8000/api/"

  constructor(private http: HttpClient) {}

  getOrganizationList(): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-organization/list/` , '' )
  }

  orgAdd(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-organization/create/` , data )
  }

  orgUpdate(data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}micro-organization/update/` , data )
  }
}
