import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = "http://192.168.132.225:8000/api/"

  constructor(private http: HttpClient) {}

  getOrganizationList(): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-organization/list/` , '' )
  }

  getBranchList(organization:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-branch/list/?page=1&page_size=10` , organization )
  }

  getDepartmentList(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-department/list/?page=1&page_size=10` , data )
  }

  departmentAdd(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-department/create/` , data )
  }

  departmentUpdate(data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}micro-department/update/` , data )
  }

  departmentDelete(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-department/delete/` , data )
  }
}
