import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Base_Url } from '../../../contracts/base_url';
import { Create_Product } from '../../../contracts/create_product';
import { List_Product } from '../../../contracts/list_product';
import { List_Product_Image } from '../../../contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) { }

  async getBaseStorageUrl(): Promise<Base_Url> {
    const getObservable: Observable<Base_Url> = this.httpClientService.get<Base_Url>({
      controller: "files",
      action: "GetBaseStorageUrl"
    });
    
    return await firstValueFrom(getObservable);
  }
}
