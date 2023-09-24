import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  baseUrl = "http://192.168.132.225:8000/api/"

  constructor(private http: HttpClient) {}

  getOrganizationList(): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-organization/list/` , '' )
  }

  getBranchList(organization:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-branch/list/?page=1&page_size=10` , organization )
  }

  branchAdd(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-branch/create/` , data )
  }

  branchUpdate(data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}micro-branch/update/` , data )
  }

  branchDelete(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-branch/delete/` , data )
  }
}
