import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;   // JQuery kütüphanesi icin eklenir

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiniECommerceClient';
  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router) {

    authService.identityCheck();

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

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatilmistir.", "Cikis Yapildi", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopLeft
    });
  }
}
//jquery nin calismasini test etmek icin
//$(document).ready(() => {
//  alert("merhaba")
//})

//$.get("https://localhost:7297/api/products", (data: any) =>{
//  console.log(data)
//})
