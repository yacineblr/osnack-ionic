import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OrderPage } from './../order/order';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public goTo(page: string) {
    this.navCtrl.push(OrderPage)
  }

}
