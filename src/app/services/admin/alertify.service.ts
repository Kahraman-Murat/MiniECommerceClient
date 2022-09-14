import { Injectable } from '@angular/core';
declare var alertify: any; //alertify kütüphanesi icin eklenir

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  /*
  message(message: string, 
    messageType: MessageType, 
    position: Position, delay: number = 3, dismissOthers: boolean = false)*/

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    
    const msj = alertify[ options.messageType! ](message); // ! null olmayan onaylama operatörü yada   as MessageType
    if (options.dismissOthers)
      msj.dismissOthers();
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}
export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "tio-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
}