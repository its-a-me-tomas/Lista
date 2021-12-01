import { Component, OnInit } from '@angular/core';
//barcodescanner
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
//ayuda a base de datos
import { PHPService } from '../services/php.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  scanData: {};
  option: BarcodeScannerOptions;
//inyectar constructor
constructor(private scanner: BarcodeScanner, private service:PHPService) {}

time = new Date();

/* //constructor
this.data += this.time.toLocaleTimeString() + " "
this.data += this.time.toLocaleDateString(); */

  ngOnInit() {
    /* this.service.proofId('').subscribe(response =>{
      console.log(response)
    }) */
  }
  
  // function to scan
  /* 
  QRscaner(){
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        this.qrScanner.show();
        document.getElementsByTagName("body")[0].style.opacity="0.3";
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          alert('Scanned something: ' + text);
          document.getElementsByTagName("body")[0].style.opacity="1";
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }
  */
  scan() {
    this.option = {
      prompt: 'scan your qrcode',
    };
    this.scanner.scan(this.option).then(
      (data) => {
        console.log(data);
        this.scanData = data;
        this.sendData()
      },
      (err) => {
        console.log('Scan data error: ', err);
      }
    );
  }

  //send to the data base
  sendData(){

  }
}
