import { getLocaleMonthNames } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, Inject, Input, OnInit, OnChanges, ViewChildren, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatTable} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-datatable';
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

  table: any;
  dataSource: MatTableDataSource<any>;
  items: Object;
  update: Object;


  constructor( private changeDetectorRefs: ChangeDetectorRef,private router: Router, private http: HttpClient,private fb: FormBuilder,private dialogRef: MatDialogRef<PaydialogComponent>, @Inject(MAT_DIALOG_DATA) data) {

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
 * this function will get the hour time
 */
  getDate(){
    var dateFormat = require('dateformat');
    var now = new Date();
    const time = dateFormat(now, "longTime");
    return time
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

create(){

  //Posting Cart Data
  this.http.get('/api/cart').subscribe(res => {
    this.cart = res;
    console.log('items quatity', this.cart.lineItems)

          /***
 * This function gives the day number of the year.
 */

var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
let diff = Math.abs( now.valueOf() - start.valueOf());
var oneday = 1000 * 60 * 60* 24;

var timerightnow = Math.floor(  oneday / diff);

var diffe = Math.abs( start.valueOf()- now.valueOf());
var numberoftheyear = Math.floor(diffe / (1000 * 3600 * 24));

console.log('this is the time now', numberoftheyear)

/**
* Funtion Ends ------
*/

/****
 * Get month function
 */
function GetMonth(){
var d = new Date();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
console.log(months[d.getMonth()])
return months[d.getMonth()]
}
/**
 * Get Day of the week
 */
function GetDay() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[d.getDay()];
 return n
}
/**
 * Get day number of the month
 */
function getDayNumber(){
var d = new Date();
return d.getDate();
}
    console.log('this is the cart at when click the pay button', this.cart)
    var customer = this.customer.length
    console.log('month',GetMonth())
    console.log('this is the customer',customer)
     this.http.post('/api/customer/',{
      customerNumber: customer,
      lineItems: this.cart,
      dateNumber: numberoftheyear,
      month: GetMonth(),
      day: GetDay(),
      dayNumber: getDayNumber()
     }).subscribe(res =>{
       console.log('copy and paste',res)
       this.http.delete('/api/cart').subscribe(res =>{
         console.log('cart deleted')

      //     this.cart = new Array
      // console.log('after close on opendialog',this.cart)
      // this.cart = this.cart.filter(this.cart);

       })
     })

  });
  console.log('testign')
  this.dialogRef.close(this.form.value);

  //Closing the mondal and updating the table



}






close(){
  // this.cart = new Array
  this.router.navigate(['/sell']);
  // this.cart = this.cart
  // console.log('after close on opendialog',this.cart)

  this.dialogRef.close();

  // this.cart = this.cart.concat(this.cart)

}


}


