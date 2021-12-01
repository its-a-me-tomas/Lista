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
  com = new Date();
  json: JSON;
  data: any;
  // function to scan
  scan(event: String) {
    //recibe id de evento
    this.option = {
      prompt: 'Enfoca el QR!',
    };
    this.scanner.scan(this.option).then(
      (id_user) => {
        if (event == '1') {
          this.com.setHours(0o7, 0o0, 0o0);
          if (this.com < this.current) {
            this.data = {
              user: id_user.text,
              event: event,
              status: 'Puntual',
              date: this.current.toISOString().slice(0, 10),
            };
          } else {
            this.data = {
              user: id_user.text,
              event: event,
              status: 'Retardo',
              date: this.current.toISOString().slice(0, 10),
            };
          }
          alert('Paso M');
        } else {
          this.com.setHours(19, 30, 0o0);
          if (this.com < this.current) {
            this.data = {
              user: id_user.text,
              event: event,
              status: 'Puntual',
              date: this.current.toISOString().slice(0, 10),
            };
          } else {
            this.data = {
              user: id_user.text,
              event: event,
              status: 'Retardo',
              date: this.current.toISOString().slice(0, 10),
            };
          }
          alert('Paso v');
        }
        const assistance = this.data;
        console.log(this.data);
        this.service.insert(assistance).subscribe((response) => {
        this.alertcrl
        .create({
          header: 'HEY!',
          message: 'Alumno registrado'+response,
          buttons: ['Close'],
        })
        .then((alertView) => alertView.present());
        });
      },
      (err) => {
        this.alertcrl
        .create({
          header: 'HEY!',
          message: 'Error al registrar al alumno: '+err,
          buttons: ['Close'],
        })
        .then((alertView) => alertView.present());
      }
    );
  }

  //send to the data base
  sendData(assistance) {}
}
