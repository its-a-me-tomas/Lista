import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface student {
  matricula: String;
  name: String;
  id_user: String;
  access: number;
}

export interface Assistance {
  user: String;
  event: String;
  status: String;
  date: String;
}

@Injectable({
  providedIn: 'root',
})
export class PHPService {
  //URL a la app
  //private url = 'http://localhost/api_crud/alumno';
  private url = "http://controldormitorio.mywebcommunity.org/api_crud/alumno";
  constructor(private http: HttpClient) {} //injectar

  //create the methodsAlumno
  //insert assistance
  insert(assistance: JSON) {
    return this.http.post(this.url + '/asistencia/', assistance);
  }

  proofId(matricula: String) {
    return this.http.get<student>(this.url + '/' + matricula);
  }
}
