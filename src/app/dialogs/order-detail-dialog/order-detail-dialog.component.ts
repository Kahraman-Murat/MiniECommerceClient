import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from '../../base/base.component';
import { SingleOrder } from '../../contracts/order/single_order';
import { Position } from '../../services/admin/alertify.service';
import { DialogService } from '../../services/common/dialog.service';
import { OrderService } from '../../services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService) {
    super(dialogRef)
  }

  singleOrder: SingleOrder;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(this.data as string)
    this.dataSource = this.singleOrder.basketItems;
    debugger
    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        //alert(this.data);
        this.spinner.show(SpinnerType.BallAtom);
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallAtom);
        this.toastrService.message("Siparis basariyla tamamlandi ! Müsteriye bilgi verildi.", "Siparis Tamamlandi !", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopLeft
        })
      }
    });
  }

}

export enum OrderDetailDialogState {
  Close,
  OrderComplete
}

