import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { Create_User } from '../../../contracts/users/create_user';
import { User } from '../../../entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User>{
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?:()=> void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "users",
      action: "login"
    }, { userNameOrEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    //debugger;
    //console.log(tokenResponse.token.accessToken);
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      //localStorage.setItem("expiration", token.expiration.toString());

      this.toastrService.message("Kullanici Girisi Basarilidir.", "Giris Basarili", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopLeft
      })
    }

    callBackFunction();

  }

  async googleLogin(user: SocialUser, callBackFunction? : () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = await this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "users"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Google ile Giris Basarilidir.", "Giris Basarili", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopLeft
      })
    }

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = await this.httpClientService.post<SocialUser | TokenResponse>({
      action: "facebook-login",
      controller: "users"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.toastrService.message("Facebook ile Giris Basarilidir.", "Giris Basarili", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopLeft
      })
    }      

    callBackFunction();
  }
}
