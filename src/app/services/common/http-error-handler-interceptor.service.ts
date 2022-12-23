import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek icin oturum acmaniz gerekiyor.", "Oturum Aciniz !", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopLeft
                });
              else
                this.toastrService.message("Bu islemi yapmaya yetkiniz bulunmamaktadir.", "Yetkisiz Islem !", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.BottomFullWidth
                });
            }
          }).then(data => {
            this.toastrService.message("Bu islemi yapmaya yetkiniz bulunmamaktadir.", "Yetkisiz Islem !", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
          });            
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erisilemiyor.", "Sunucu Hatasi !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Gecersiz istek yapildi.", "Gecersiz Istek !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadi.", "Sayfa Bulunamadi !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmistir.", "Hata !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
      }

      //console.log("abbbb");
      //debugger;
      //console.log(error);

      this.spinner.hide(SpinnerType.BallAtom);
      return of(error);
    }));

  }
}
