import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private alertifyService: AlertifyService) {
    super(spinner)
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.BallAtom);
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertifyService.message("Email Basari ile gönderilmistir.", {
        messageType: MessageType.Notify,
        position: Position.TopLeft
      })
    })

  }

}
