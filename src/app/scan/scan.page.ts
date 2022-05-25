import { Component, OnInit } from '@angular/core';
//barcodescanner
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
//ayuda a base de datos
import { PHPService } from '../services/php.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  option: BarcodeScannerOptions;

  //inyectar constructor
  constructor(private scanner: BarcodeScanner, private service: PHPService, private alertcrl: AlertController) {}

  ngOnInit() {
    /* this.service.proofId('').subscribe(response =>{
      console.log(response)
    }) */
  }

  current = new Date();
  comparar = new Date();
  json: JSON;
  data: any;
  // function to scan
  scan(event: String) { //crear metodo para generar eventos
    console.log(this.current.toISOString());
    this.option = {
      prompt: 'Enfoca el QR!',
    };
    this.scanner.scan(this.option).then(  //mejorar las condicionales
      (id_user) => {
        if(id_user.text != ''){
          if (event == '1') {
            this.comparar.setHours(0o7, 0o0, 0o0);
            if (this.comparar > this.current) {
              this.data = {
                user: parseInt(id_user.text),
                event: event,
                status: 'Puntual',
                date: this.current.toISOString()
              };
            } else {
              this.data = {
                user: parseInt(id_user.text),
                event: event,
                status: 'Retardo',
                date: this.current.toISOString()
              };
            }
          } else {
            this.comparar.setHours(19, 30, 0o0);
            if (this.comparar > this.current) {
              this.data = {
                user: parseInt(id_user.text),
                event: event,
                status: 'Puntual',
                date: this.current.toISOString()
              };
            } else {
              this.data = {
                user: parseInt(id_user.text),
                event: event,
                status: 'Retardo',
                date: this.current.toISOString()
              };
            }
          }
          console.log(this.data);
          this.service.insert(this.data).subscribe((response) => {
            if(response != null){
              this.alertcrl
              .create({
                header: 'Atención',
                message: 'Alumno registrado '+response,
                buttons: ['Close'],
              })
              .then((alertView) => alertView.present());
            }else{
              this.alertcrl
              .create({
                header: 'Atención',
                message: 'Alumno no registrado',
                buttons: ['Close'],
              })
              .then((alertView) => alertView.present());
            }
          });
        }
      },
      (err) => {
        this.alertcrl
        .create({
          header: 'Atención',
          message: 'Error de escaneo: '+err,
          buttons: ['Close'],
        })
        .then((alertView) => alertView.present());
      }
    );
  }

  //send to the data base
  sendData() {    
    this.data = {
      user: 6,
      event: 2,
      status: 'Puntual',
      date: this.current.toISOString().slice(0,19)
    }
    this.service.insert(this.data).subscribe((response) => {
      this.alertcrl
      .create({
        header: 'HEY!',
        message: 'Alumno registrado '+response,
        buttons: ['Close'],
      })
      .then((alertView) => alertView.present());
    });
  }
}
