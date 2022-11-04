import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { HttpClientService } from '../../../services/common/http-client.service';
import { BasketService } from '../../../services/common/models/basket.service';

declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private basketService: BasketService) {
    super(spinner)
  }

  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallAtom);
    //debugger;
  }

  //async
  changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;

    //const observable: Observable<any> =<any>
    this.basketService.updateQuantity({
      basketItemId: basketItemId,
      quantity: quantity
    });

    //await firstValueFrom(observable);
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallAtom);
    
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(500, ()=>this.hideSpinner(SpinnerType.BallAtom));
       
  }


}
