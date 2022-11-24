import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from '../../../contracts/application-configurations/menu';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  async getAuthorizeDefinitionEndpoints(): Promise<Menu[]>  {
    const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller: "applicationservices"
    });

    return await firstValueFrom(observable);
  }
}
