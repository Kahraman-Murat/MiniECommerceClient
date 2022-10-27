import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu islemi yapmaya yetkiniz bulunmamaktadir.", "Yetkisiz Islem !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erisilemiyor.", "Sunucu Hatasi !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Gecrsiz istek yapildi.", "Gecersiz Istek !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadi.", "Sayfa Bulunamadi !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;

        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmistir.", "Hata !", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
      }

      //console.log("abbbb");
      //debugger;
      //console.log(error);
      return of(error);
    }));

  }
}
