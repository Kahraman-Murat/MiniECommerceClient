import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;   // JQuery kütüphanesi icin eklenir

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiniECommerceClient';
  constructor(private toastrService: CustomToastrService){
    
    /*
    toastrService.message("Merhaba","Murat", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopFullWidth
    });
    toastrService.message("Merhaba","Murat", {
      messageType : ToastrMessageType.Error, 
      position: ToastrPosition.BottomCenter
    });
    toastrService.message("Merhaba","Murat", {
      messageType: ToastrMessageType.Success, 
      position: ToastrPosition.BottomLeft
    });
    toastrService.message("Merhaba","Murat", {
      messageType: ToastrMessageType.Warning, 
      position: ToastrPosition.BottomRight
    });
    */

  }
}
//jquery nin calismasini test etmek icin
//$(document).ready(() => {
//  alert("merhaba")
//})

//$.get("https://localhost:7297/api/products", (data: any) =>{
//  console.log(data)
//})
