import { Component, OnInit } from '@angular/core';

//qr import
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';



@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  ngOnInit() {
  }

  //inyectar constructor
  constructor(private qrScanner: QRScanner) {  }
  // function to scan
  scanner(){
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

}
