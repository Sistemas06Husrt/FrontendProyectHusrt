import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImagingService {

  constructor(private http: HttpClient) { }

  getAllcites(): Observable<any>{
    const url = 'http://localhost:3000/citesCE';
    return this.http.get<any[]>(url, {observe: 'response'})
  }

  getCitesDate(body: any): Observable<any>{
    const url = 'http://localhost:3000/citesCEFecha';
    return this.http.post<any[]>(url,body,{observe: 'response'})
  }
}
