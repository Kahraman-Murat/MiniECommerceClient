import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { BasketsComponent } from './components/baskets/baskets.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class UiModule { }
