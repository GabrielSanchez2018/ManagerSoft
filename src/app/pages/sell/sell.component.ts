import { Component, OnInit, ChangeDetectorRef,  ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatSnackBar, MatSort } from '@angular/material';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { PaydialogComponent } from 'src/app/dialogs/paydialog/paydialog.component';

import { MatTable } from '@angular/material';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {



  displayedColumns = ['image','itemDescription', 'itemPrice', 'functions'];
  form: any;
  items: any;
  itemScan: any;
  AssetNumber: any;
  itemCode: any;
  scannedItem: any;
  item: any;
  cart: any;
  //lineItems: any;
  dataSource: any;
  btnArray: Object;
  btnArrayTest: Object;

row:any;

table: MatTable<any>;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {

// Remove the deleted row from the data table.
// Need to remove from the downloaded data first.


    this.http.get('/api/asset').subscribe(res => {
      this.btnArray = res;
      console.log(this.btnArray)

      // var img = this.assets.img
      // img = 'data:image/png;base64,' + this.inspectionDetails.reportImage;
    }, err => {
      console.log(err);
    });


    this.http.get('/api/manualitems').subscribe(res => {
      this.btnArrayTest = res;
      console.log(this.btnArrayTest)

      // var img = this.assets.img
      // img = 'data:image/png;base64,' + this.inspectionDetails.reportImage;
    }, err => {
      console.log(err);
    });



      this.http.get('/api/items').subscribe(res => {
        this.items = res;
         console.log(this.items)
        const description = this.items[0].itemDescription


      }, err => {
        console.log(err);
      });

      this.http.get('/api/cart').subscribe(res => {
        this.cart = res;
         console.log(this.cart)
         if(Array.isArray(this.cart)){
          this.cart = this.cart.filter(q => q._id !);
        }



      }, err => {
        console.log(err);
      });




  }

  ngOnInit() {
    this.form = this.fb.group({
      itemScan: [null, Validators.compose([Validators.required])]
    });

  }

  refresh(){
    setTimeout(function(){

      this.http.get('/api/cart').subscribe(res => {
        this.cart = res;
         console.log(this.cart)

      })
      this.cart.concat()
      alert('hello', )


    }, 1000)
  }


  /***
   *  I hid the button for this function, this fuction gets a copy from the cart and post it into the customer collection.
   *
   */
  create(){
    /**
     * Passing the Items IPI to the create funtion.
     */
    console.log(this.form.controls.itemScan.value)
    var scannedItem = this.form.controls.itemScan.value
    this.http.get('/api/items').subscribe(res => {
      if(res){
        console.log('this is res', res)
        this.cookieService.set('Item', scannedItem, 1, '/', '', false, "Strict");
      }
    }, err => {
      console.log(err);
    });



    this.http.get('/api/items/' + scannedItem).subscribe(res => {
      if(res){
         this.item = res
      console.log(this.item)
      } else {

        this.snackBar.open(
          "Producto No Indentificado, lo puedes anadir.",
          "ERROR",

          {
            duration: 4000,
            verticalPosition: "top"
          }


        );
        throw new Error("Something went badly wrong!");
      }
      console.log(this.item.itemCode)


//creating an array to store the objects
  //   let savedArray = []


  // let lineItem = {
  //   itemCode:this.item.itemCode,
  //   itemDescription:  this.item.itemDescription,
  //   itemPrice: this.item.itemPrice,
  //   itemType: this.item.itemType
  // };
  // savedArray.push(lineItem)
  // this.form.reset();

  // console.warn('added', {lineItem})






      // console.log('this is the saved array', savedArray)

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

/***
 * This function post with a barcode.
 */


     var lineItems = [{
      img: this.item.img,
      itemCode:this.item.itemCode,
      itemDescription:  this.item.itemDescription,
      itemPrice: this.item.itemPrice,
      itemType: this.item.itemType,
      dateNumber: numberoftheyear
     }];


     console.log('saved before pushing ', lineItems)


      this.http.post('/api/cart/',{
        img: this.item.img,
        lineItems: lineItems,
        itemCode: this.item.itemCode,
        itemDescription: this.item.itemDescription,
        itemPrice: this.item.itemPrice,
        itemType: this.item.itemType,
        dateNumber: numberoftheyear
      }).subscribe(res =>{
        this.cart = this.cart.concat([res]);
        console.log('this is concat',this.cart)
        this.form.reset();
      })
      this.cookieService.delete('Item')
    }, err => {
      console.log(err);
    });



  }

  getTotalCost() {
    return this.cart.map(t => t.itemPrice).reduce((acc, value) => acc + value, 0);
  }


  openPayDialog() {
    const dialogRef = this.dialog.open(PaydialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( res =>{

      //this will create a new empty array
      this.cart = new Array
      console.log('after close on opendialog',this.cart)
      this.cart = this.cart.concat(this.cart);
    }


    );
  }



  delete(CartId) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        CartId
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/cart/' + CartId).subscribe(res => {
          console.log('Cart item deleted');
          if(Array.isArray(this.cart)){
            this.cart = this.cart.filter(q => q._id !== CartId);
          }

          console.log(this.cart);
        });
      }
    });
  }


  background: any
  changePageBg(data){
    this.background = data.assetNumber
    var dateFormat = require('dateformat');
    var now = new Date();
    const time = dateFormat(now, "isoDate");
    console.log(data.img)

    this.http.post('/api/cart/',{
      img: data.img,
      itemCode: data.itemCode,
      itemDescription: data.itemDescription,
      itemPrice: data.itemPrice,
      itemType: data.itemType,
      time: time
    }).subscribe(res =>{
      this.cart = this.cart.concat([res]);
      this.displayedColumns;
      console.log('this is concat',this.cart)
      this.form.reset();
      this.dataSource.renderRows();
    })
    this.dataSource.deleted
    this.cookieService.delete('Item')
  }



  changePage(data){
    this.background = data.assetNumber
    var dateFormat = require('dateformat');
    var now = new Date();
    const time = dateFormat(now, "isoDate");
    this.http.post('/api/cart/',{
      img: data.img,
      itemCode: data.itemCode,
      itemDescription: data.itemDescription,
      itemPrice: data.itemPrice,
      itemType: data.itemType,
      time: time
    }).subscribe(res =>{
      this.cart = this.cart.concat([res]);
      console.log('this is concat',this.cart)
      this.form.reset();
      this.dataSource.renderRows();
    })
    this.dataSource.deleted
    this.cookieService.delete('Item')
  }


}
