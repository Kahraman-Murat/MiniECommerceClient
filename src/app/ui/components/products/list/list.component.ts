import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { Base_Url } from '../../../../contracts/base_url';
import { Create_Basket_Item } from '../../../../contracts/basket/create_basket_item';
import { List_Product } from '../../../../contracts/list_product';
import { BasketService } from '../../../../services/common/models/basket.service';
import { FileService } from '../../../../services/common/models/file.service';
import { ProductService } from '../../../../services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService,
    private customToastrService: CustomToastrService) {
    super(spinner)
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: Base_Url;
  products: List_Product[];
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    
        
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });
      this.products = data.products;      
      
      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          name: p.name,
          stock: p.stock,
          price: p.price,
          createdDate: p.createdDate,
          updatedDate: p.updatedDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "none",
            productImageFiles: []
        };
        return listProduct;

      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];
      if (this.totalPageCount < 7)
        for (let i = 1; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      else {
        if (this.currentPageNo - 3 <= 0)
          for (let i = 1; i <= 7; i++)
            this.pageList.push(i);

        else if (this.currentPageNo + 3 >= this.totalPageCount)
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
            this.pageList.push(i);

        else
          for (let i = this.totalPageCount - 3; i <= this.totalPageCount + 3; i++) this.pageList.push(i);
      }



    });
    
  }


  async addToBasket(product: List_Product) {

    //let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    //_basketItem.productId = product.id;
    //_basketItem.quantity = 1;

    this.showSpinner(SpinnerType.BallAtom);
    await this.basketService.add({
      productId: product.id,
      quantity: 1
    });
    this.hideSpinner(SpinnerType.BallAtom);
    this.customToastrService.message("Ürün sepete eklenmistir.", "Sepete Eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopLeft
    });
  }
}
