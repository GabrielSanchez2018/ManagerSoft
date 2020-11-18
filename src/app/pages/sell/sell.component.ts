import { Component, OnInit, ChangeDetectorRef,  ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { PaydialogComponent } from 'src/app/dialogs/paydialog/paydialog.component';

import { MatTable } from '@angular/material';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {



  displayedColumns = ['itemDescription', 'itemType','itemPrice', 'functions'];
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



      }, err => {
        console.log(err);
      });

/***
 * This function gives the day number of the year.
 */

    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    let diff = Math.abs( now.valueOf() - start.valueOf());
    var oneday = 1000 * 60 * 60* 24;

    var timerightnow = Math.floor(  oneday / diff);

    var diffe = Math.abs( start.valueOf()- now.valueOf());
    var lastdate = Math.floor(diffe / (1000 * 3600 * 24));

    console.log('this is the time now', lastdate)

/**
 * Funtion Ends ------
 */



  }

  ngOnInit() {
    this.form = this.fb.group({
      itemScan: [null, Validators.compose([Validators.required])]
    });

  }

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



     var lineItems = [{
      itemCode:this.item.itemCode,
      itemDescription:  this.item.itemDescription,
      itemPrice: this.item.itemPrice,
      itemType: this.item.itemType
     }];


     console.log('saved before pushing ', lineItems)


      this.http.post('/api/cart/',{
        lineItems: lineItems,
        itemCode: this.item.itemCode,
        itemDescription: this.item.itemDescription,
        itemPrice: this.item.itemPrice,
        itemType: this.item.itemType,
      }).subscribe(res =>{
        this.cart = this.cart.concat([res]);
        console.log('this is concat',this.cart)
        this.form.reset();
        this.dataSource.renderRows();
      })
      this.dataSource.deleted
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


    dialogRef.afterClosed().subscribe(
      

    );
      console.log( 'concat afeter delete', this.cart.concat([this.dataSource]))

      
     
    
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
    this.http.post('/api/cart/',{

      itemCode: data.itemCode,
      itemDescription: data.itemDescription,
      itemPrice: data.itemPrice,
      itemType: data.itemType,
    }).subscribe(res =>{
      this.cart = this.cart.concat([res]);
      console.log('this is concat',this.cart)
      this.form.reset();
      this.dataSource.renderRows();
    })
    this.dataSource.deleted
    this.cookieService.delete('Item')
  }



  changePage(data){
    this.background = data.assetNumber
    this.http.post('/api/cart/',{

      itemCode: data.itemCode,
      itemDescription: data.itemDescription,
      itemPrice: data.itemPrice,
      itemType: data.itemType,
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