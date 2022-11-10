import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef         : Dinamik olarak yüklenecek componenti icerisinde barindiran container'dir
  //                           Her dinamik yükleme sürecinde önceki viewleri clear etmek gereklidir,
  //ComponentFactory         : Componentlerin instancelerini olusturmak icin kullanilan nesnedir.
  //ComponentFactoryResolver : Belirli bir component icin ComponentFactory'i resolve eden siniftir
  //    icerisindeki resolveComponentFactory fonksiyonu araciligiyla ilgili componente dair bir
  //    ComponentFactory nesnesi olusturup, döner.

  constructor(
    // private componentFactoryResolver: ComponentFactoryResolver *angular kaldurdi artik kullanilmiyor
    ) { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;

    switch (component) {
      case ComponentType.BasketsComponent:
        _component = await (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);
      //this.componentFactoryResolver.resolveComponentFactory(_component) bunada gerek kalmadi
  }
}


export enum ComponentType {
  BasketsComponent
}
