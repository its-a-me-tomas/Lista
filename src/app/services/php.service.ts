import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface student{
  matricula: String;
  fecha: String;
  name: String;
  id_user: String;
  access: number;
}

@Injectable({
  providedIn: 'root'
})
export class PHPService {
  //URL a la app
  private url = "http://localhost/api_crud/connection/alumno"
  //private url = "https://www.black-hatcoders.com/api_crud/connection/"
  constructor(private http: HttpClient) { }//injectar

  //create the methods
  //insert assistance
  insert(matricula: string){
    return this.http.get<student>(this.url+'/'+matricula)
  }
  
  proofId(matricula: String){
    return this.http.get<student>(this.url+'/'+matricula)
  }
}
