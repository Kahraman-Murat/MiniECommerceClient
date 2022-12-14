import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { QrcodeReadingDialogComponent } from '../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';
import { DialogService } from '../../../services/common/dialog.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private httpClientService: HttpClientService,
    private dialogService: DialogService) {
    super(spinner)
  }

  ngOnInit(): void {
    //this.showSpinner(SpinnerType.BallAtom);

    //this.httpClientService.get<Create_Product[]>({
    //  controller: "products"
    //}).subscribe(data => console.log(data));
    /*
        this.httpClientService.post({
          controller:"products"
        },{
          name:"Kalem",
          stock: 100,
          price:15
        }).subscribe();
        

    this.httpClientService.put({
      controller: "products"
    }, {
      id: "35c80709-a7b6-4870-b5af-92dc419fa97c",
      name: "Tükenmez Kalem",
      stock: "55",
      price: 6.6
    }).subscribe();
    */
    // this.httpClientService.delete({
    //   controller: "products",
    // }, "3964e950-9b28-4a7e-b21f-295f7159c64d"
    // ).subscribe();


    // this.httpClientService.get({
    //   //baseUrl: "https://jsonplaceholder.typicode.com",
    //   //controller: "posts"
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data => console.log(data));

  }

  @ViewChild(ListComponent) listComponents: ListComponent;
  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }

  showProductQrcodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      data: null,
      options: {
        width:"1000px"
      },
      afterClosed: () => { }
    })
  }
}
