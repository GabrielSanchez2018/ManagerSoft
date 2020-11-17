import { HttpClient} from '@angular/common/http';
import { Component, Inject, Input, OnInit, OnChanges,  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { clear } from 'console';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-paydialog',
  templateUrl: './paydialog.component.html',
  styleUrls: ['./paydialog.component.css']
})
export class PaydialogComponent implements OnInit{
  cart: any;
  form: any;
  show: boolean = true;
  i: Number;
  customer: any;
  map: any;

  constructor(private http: HttpClient,private fb: FormBuilder,private dialogRef: MatDialogRef<PaydialogComponent>, @Inject(MAT_DIALOG_DATA) data) {

    this.http.get('/api/cart').subscribe(res => {
      this.cart = res;
       console.log('this is the cart',this.cart)

    }, err => {
      console.log(err);
    });

    this.http.get('/api/customer').subscribe(res => {
      this.customer = res;
       console.log('this is the cart',this.customer.length)

    }, err => {
      console.log(err);
    });



   }





  customerNumber(){
    var x = this.customer.length
    return x
  }


  ngOnInit() {
    this.form=this.fb.group({
      change: [null, Validators.compose([Validators.required])],

    });

  }
/***
 * This is the total cost function
 * gets the total cost variable
 */
  getTotalCost() {
    return this.cart.map(t => t.itemPrice).reduce((acc, value) => acc + value, 0);
  }
/**
 * This is the change function
 * Gets the change variable
 */
getChange(){
  var  pay = this.getTotalCost()
  var inputedNumber = this.form.controls.change.value
  var zero = 0
  var total = zero + pay - inputedNumber
return Math.abs(total)
}

create(alldelete){
  this.http.get('/api/cart').subscribe(res => {
    this.cart = res;

    var customer = this.customer.length
    console.log('this is the customer',customer)
     this.http.post('/api/customer/',{
      customerNumber: customer,
      lineItems: this.cart
     }).subscribe(res =>{
       console.log('copy and paste',res)
     })
     this.http.delete('/api/cart/').subscribe(res =>{
      console.log('Cart deleted', res);


    })

     this.http.get('/api/cart').subscribe(res =>{
      this.cart = res
      console.log('res try', this.cart.deleted)
      console.log( 'concat afeter delete', this.cart.concat([]))
    })

    this.dialogRef.close(this.form.value);



  }, err => {
    console.log(err);
  });
}


close(){
  this.dialogRef.close();

}


}


