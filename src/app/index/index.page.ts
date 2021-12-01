import { Component, OnInit } from '@angular/core';
//get data route
import { ActivatedRoute } from "@angular/router";
//barcode
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  QR: {};
  
  data: any ;
  constructor(private scanner: BarcodeScanner, private active: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.active.snapshot.paramMap.get('id')//get matricula by url 
    //console.log(this.data); 
    this.qrcode(this.data); 
  }
  
  qrcode(encodedData: string){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE,encodedData).then((QR)=>{
      //console.log(QR);
      this.QR = QR;
    }, (err)=>{
      console.log("Error to encoded data: "+err)
    })

  }
}
