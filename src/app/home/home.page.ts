import { Component } from '@angular/core';
//router module
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import service
import { PHPService } from '../services/php.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  matricula: string;
  constructor(
    private route: Router,
    private alertcrl: AlertController,
    private service: PHPService
  ) {}

  ngOnInit() {
    
  }

  change() {
    //console.log('button clicked');
    if (this.matricula == undefined) {
      this.alertcrl
        .create({
          header: 'Atencion!',
          message: 'Ingresa tu matricula',
          buttons: ['Close'],
        })
        .then((alertView) => alertView.present());
    } else {
      //insertar servicio y comprobar matricula
      this.service.proofId(this.matricula).subscribe((Response) => {
        console.log('matricula recibida');
        if (Response == null) {
          this.alertcrl
            .create({
              header: 'Atencion!',
              message: "Esa matricula no existe",
              buttons: ['Close'],
            })
            .then((alertView) => alertView.present());
        } else {
          if (Response.access == 2) {
            this.route.navigate(['/scan']);
            console.log('monitor access: ' + Response.name);
          } else if (Response.access == 1){
            this.route.navigate(['/index/' + Response.id_user]);
            //console.log('id alumno: ' + Response.id_user);
          }
        }
      });
    }
  }
/* 
  hora = new Date();
  ti = new Date();
  data: any;
  user = '3';
  event = '1';
  time() {
    this.ti.setHours(19, 30, 0o0);
    //console.log(this.ti.toLocaleTimeString());
    if (this.ti > this.hora) {
      this.data = {
        user: this.user,
        event: this.event,
        status: 'Puntual',
        date: this.hora.toISOString().slice(0, 10),
      };
    } else {
      this.data = {
        user: this.user,
        event: this.event,
        status: 'Retardo',
        date: this.hora.toISOString().slice(0, 10),
      };
    }

    console.log(this.data);
    const infor = this.data;
    this.service.insert(infor).subscribe((response) => {
      alert("Info enviada: "+response);
    })
  }  */
}