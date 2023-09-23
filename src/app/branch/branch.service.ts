import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  baseUrl = "http://192.168.132.225:8000/api/"

  constructor(private http: HttpClient) {}

  getBranchList(organization:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-branch/list/` , organization )
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
