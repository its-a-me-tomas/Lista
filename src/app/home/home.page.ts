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
  matricula: string ;
  constructor(private route: Router, private alertcrl: AlertController, private service: PHPService) {}

  change() {
    console.log("button clicked")
    if(this.matricula == undefined){
        this.alertcrl.create({
        header: 'HEY!',
        message:'You need to fill matricula',
        buttons: ['Close']
     }).then(alertView => alertView.present());
    }else{
      this.service.proofId(this.matricula).subscribe(Response =>{
        console.log('matricula recibida');
        if(Response == null){
          this.alertcrl.create({
            header: 'HEY!',
            message:'the matricula doesn\'t exist',
            buttons: ['Close']
         }).then(alertView => alertView.present());
        } else {
          if (Response.access == 1){
            this.route.navigate(['/scan']);
            console.log('monitor access: '+Response.name)
          } else {
            this.route.navigate(['/index/'+Response.id_user]);
            console.log('id alumno: '+Response.id_user);
          }
        }
      });
        //insertar servicio y comprobar matricula
        //console.log('paso a la ruta');
      }    
  }
}
