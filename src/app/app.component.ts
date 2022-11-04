import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

declare var $: any;   // JQuery kütüphanesi icin eklenir

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiniECommerceClient';

  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
    private httpClientService: HttpClientService,
    private dynamicLoadComponentService: DynamicLoadComponentService) {


    //httpClientService.get({
    //  controller: "baskets"
    //}).subscribe(data => {
    //  debugger;
    //});

    //httpClientService.post({
    //  controller: "baskets"
    //}, {
    //  productId: "31d1de82-a02d-40a8-b8a4-b3166131637c",
    //  quantity: 88
    //}).subscribe(data => {
    //  debugger;
    //});

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

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);

    //
  }
}


//jquery nin calismasini test etmek icin
//$(document).ready(() => {
//  alert("merhaba")
//})

//$.get("https://localhost:7297/api/products", (data: any) =>{
//  console.log(data)
//})
