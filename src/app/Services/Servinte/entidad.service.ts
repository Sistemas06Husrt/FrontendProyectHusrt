import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private http: HttpClient) { }

  getentidadPaciente(idPaciente: String): Observable<any>{
    const url = 'http://localhost:3002/EntidadPaciente/' + idPaciente + '';
    return this.http.get<any[]>(url, {observe: 'response'})
  }

  getEAPBEntidad(nombreEmpresa: string): Observable<any>{
    const url = 'http://localhost:3002/Entidad/' + nombreEmpresa + '';
    return this.http.get<any[]>(url, {observe: 'response'})
  }

  getConsultasPediatria(object: any): Observable<any>{
    const url = 'http://localhost:3002/evolucionesespecialistas';
    return this.http.post<any[]>(url, object,{observe: 'response'})
  }

}
