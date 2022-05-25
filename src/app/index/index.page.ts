import { Component, OnInit } from '@angular/core';
//get data route
import { ActivatedRoute } from "@angular/router";
//import service
import { PHPService } from "../services/php.service";
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  private QR: string;
  private id: string ;
  constructor(private active: ActivatedRoute,private service: PHPService) { }

  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get('id')//obtener matricula de /home/ by url = /index/id 
    //console.log(this.data); 
    this.qrcode(this.id); 
  }
  //api qr
  qrcode(id: string){
    console.log('qrcode');
    this.QR = "http://api.qrserver.com/v1/create-qr-code/?data="+id+'&size=440x440&bgcolor=221-236-86&qzone=2';
  }
}
