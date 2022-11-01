import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from '../../../../contracts/base_url';
import { List_Product } from '../../../../contracts/list_product';
import { FileService } from '../../../../services/common/models/file.service';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService) { }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;
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

}