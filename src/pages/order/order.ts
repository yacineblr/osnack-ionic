import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Product } from "../../models/product.model";
import { Order } from './../../models/order.model';


/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  private orders: FirebaseListObservable<Order[]>;
  private display: Object;
  private products: Product[];

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private _af: AngularFireDatabase) {
    this.orders = _af.list('orders');

    this.products = [
      {   
        title: 'menu',
        items: [
            {value: 'oui'},
            {value: 'non'}
          ], 
        class: {heightAnimation: 'small'},
        actives: [],
        maxActives: 1
      },
      {   
        title: 'galettes',
        items: [
          { value: 'tacos'},
          { value: 'patte à pizza'},
          ],
        class: {heightAnimation: 'small'},
        actives: [],
        maxActives: 1
      },
      {   
        title: 'viandes',
        items: [
          { value: 'escaloppe',
            imageUrl: 'http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png'},
          { value: 'cordon bleu',
            imageUrl: 'http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png'},
          { value: 'nuggets',
            imageUrl: 'http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png'},
          { value: 'merguez',
            imageUrl: 'http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png'},
          { value: 'steak',
            imageUrl: 'http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png'},
          { value: 'fish',
            imageUrl: 'http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png'},
          { value: 'chicken',
            imageUrl: 'http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png'},
          ],
        class: {heightAnimation: 'big'},
        actives: [],
        maxActives: 1
      },
      { 
        title: 'sauces',
        items: [
          { value: 'tartare'},
          { value: 'algerienne'},
          { value: 'barbecue'},
          { value: 'blanche'},
          { value: 'ketchup'},
          { value: 'mayonnaise'},
          ],
        class: {heightAnimation: 'big'},
        actives: [],
        maxActives: 3
      },
      {   
        title: 'crudites',
        items: [
          { value: 'salade'},
          { value: 'tomate'},
          { value: 'oignon'},
          ],
        class: {heightAnimation: 'medium'},
        actives: [],
        maxActives: 3
      },
      {   
        title: 'boissons',
        items: [
          { value: 'coca cola' },
          { value: 'sprite'},
          { value: 'oasis'},
          { value: 'eau'},
          { value: 'fanta'},
          { value: '7up'},
          ],
        class: {heightAnimation: 'big'},
        actives: [],
        maxActives: 1
      }
    ];
    this.display = {
      menu: true,
      galettes: false,
      viandes: false,
      sauces: false,
      crudites: false,
      boissons: false
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderePage');
  }

  public getClass(section: string, taille: string): Object {
    let classCss = {
      'colapse' : true,
    };
    classCss['show-' + taille] = this.display[section];
    return classCss;
  }
  public toogleSection(section: string): void {
    this.display[section] = !this.display[section];
  }


  public addProduct(value: string, index: number): void {
    let p = this.products[index];


    let found = false;
    p.actives.forEach((o, i) => {
      if(o.value === value) {
        o.element.classList.toggle('active');
        p.actives.splice(i, 1);
        found = true;
      }
    });
    // console.log('Found: ', found);
    if(found) return;




    let limit = p.maxActives;
    if(limit === p.actives.length) {
      p.actives[0].element.classList.toggle('active');
      p.actives.splice(0, 1);
    }






    let card_element = <HTMLElement>document.getElementById(value);
    p.actives.push(
      {element: card_element, value: value});
    card_element.classList.toggle('active');


    
    // console.log('Length: ', p.actives.length);
    // console.log('Produit: ', this.produits[index]);
  }




  private extractValues(param: {element: any, value: string}[] ): string {
    let values = [];
    param.forEach(o => values.push(o.value));
    return values.join(' - ');
  }

  public getOrder(): Object {
    let order = {}; 
    this.products.forEach((p, i) => {
      order[p.title] = this.extractValues(p.actives);
    })
    return order;
  }



  public submitOrder(): void {
    this.orders.push(this.getOrder());
  }

}
