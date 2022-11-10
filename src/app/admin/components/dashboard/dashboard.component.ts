import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HubUrls } from '../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { SignalRService } from '../../../services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private signalRService: SignalRService) {
    super(spinner)
    //signalRService.start(HubUrls.ProductHub)
    //signalRService.start(HubUrls.OrderHub)
  }

  ngOnInit(): void {
    //this.showSpinner(SpinnerType.BallAtom);

    this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      //alert(message);
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopLeft,
        delay: 5,
        dismissOthers: false
      })
    });
    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      //alert(message);
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopCenter,
        delay: 5,
        dismissOthers: false
      })
    });
  }


  m() {

    this.alertify.message("Merhaba", {
      messageType: MessageType.Success,
      position: Position.TopRight,
      delay: 5,
      dismissOthers: false
    })
  }
  d() {
    this.alertify.dismiss();
  }

}
