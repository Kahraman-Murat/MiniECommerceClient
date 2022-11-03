import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Basket_Item } from '../../../contracts/basket/create_basket_item';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  async get(): Promise<List_Basket_Item[]> {
    const observable: Observable<List_Basket_Item[]> = this.httpClientService.get<List_Basket_Item[]>({
      controller: "baskets"
    });

    return await firstValueFrom(observable);
  }

  async add(product: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post<any>({
      controller: "baskets"
    }, product);

    await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put<any>({
      controller: "baskets"
    }, basketItem);

    await firstValueFrom(observable);
  }

  async remove(basketItemId: string): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete<any>({
      controller: "baskets"
    }, basketItemId);

    await firstValueFrom(observable);
  }

}
