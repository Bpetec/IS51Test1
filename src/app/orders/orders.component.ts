import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

interface IOrder {
  pid: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<IOrder> = [];
  nameInput = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {
  }

  async ngOnInit() {

  }
  async readFile() {
    const rows = await this.http.get('assets/orders.json').toPromise();
    console.log('rows', rows.json());
    this.orders = rows.json();
    return rows.json();
  }
  clear() {
    this.orders = [];
  }
  addItem(item: string) {
    switch (item) {
      case 'Android':
        this.orders.unshift({
          'pid': '1',
          'image': 'assets/sm_android.jpeg',
          'description': 'Android',
          'price': 150.00,
          'quantity': 1
        });
        break;
      case 'IPhone':
        this.orders.unshift({
          'pid': '2',
          'image': 'assets/sm_iphone.jpeg',
          'description': 'IPhone',
          'price': 200.00,
          'quantity': 1
        });
        break;
      case 'Windows Phone':
        this.orders.unshift({
          'pid': '3',
          'image': 'assets/sm_windows.jpeg',
          'description': 'Windows Phone',
          'price': 110.00,
          'quantity': 1
        });
        break;
    }
  }
  delete(index: number) {
    console.log('index', index);
    this.orders.splice(index, 1);
  }
  calculate() {
    console.log('nameInput', this.nameInput);
    if (this.nameInput === '') {
      this.flexModal.openDialog('error-modal');
      // ('Name must not be empty!');
    } else if (this.nameInput.indexOf(',') === -1) {
      // alert('Must have a comma!');
      this.flexModal.openDialog('error2-modal');
    } else {
      let subTotal, total, taxAmt;
      total = this.orders.reduce((acc, it, i, arr) => {
        acc += it.price * it.quantity;
        return acc;
      }, 0);
      taxAmt = total * .15;
      subTotal = total - taxAmt;
      console.log('From calculate() total: ', total, 'taxAmt', taxAmt, 'subTotal', subTotal);
      return {
        total: total,
        taxAmt: taxAmt,
        subTotal: subTotal
      };
    }
  }
}
