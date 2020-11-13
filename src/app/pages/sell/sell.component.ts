import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  form: any;
  items: any;
  itemScan: any;
  AssetNumber: any;
  itemCode: any;
  scannedItem: any;



  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {

      this.http.get('/api/items').subscribe(res => {
        this.items = res;
         console.log(this.items)
        const description = this.items[0].itemDescription


      }, err => {
        console.log(err);
      });


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



    this.http.get('/api/items' + scannedItem).subscribe(res => {
      if(res){
        console.log('this is res', res)
        this.cookieService.set('Item', scannedItem, 1, '/', '', false, "Strict");
      }
    }, err => {
      console.log(err);
    });


     // console.log('this asset in page checkout',this.itemScan )
     // this.items = res;
      //  console.log(this.items)
      //  const iTems = this.items
      // console.log(iTems)





      // function getCode(){
      //   if(scan == iTems[0].itemCode){
      //     return iTems[0].itemCode
      //   } else if(scan == iTems[1].itemCode){
      //     return iTems[1].itemCode
      //   }else if(scan == iTems[2].itemCode){
      //     return iTems[2].itemCode
      //   } else if(scan == iTems[3].itemCode){
      //     return iTems[3].itemCode
      //   } else if(scan == iTems[4].itemCode){
      //     return iTems[4].itemCode
      //   } else if(scan == iTems[5].itemCode){
      //     return iTems[5].itemCode
      //   } else if(scan == iTems[6].itemCode){
      //     return iTems[6].itemCode
      //   } else if(scan == iTems[7].itemCode){
      //     return iTems[7].itemCode
      //   } else if(scan == iTems[8].itemCode){
      //     return iTems[8].itemCode
      //   } else if(scan == iTems[9].itemCode){
      //     return iTems[9].itemCode
      //   } else if(scan == iTems[10].itemCode){
      //     return iTems[10].itemCode
      //   } else if(scan == iTems[11].itemCode){
      //     return iTems[11].itemCode
      //   } else if(scan == iTems[12].itemCode){
      //     return iTems[12].itemCode
      //   } else if(scan == iTems[13].itemCode){
      //     return iTems[13].itemCode
      //   } else if(scan == iTems[14].itemCode){
      //     return iTems[14].itemCode
      //   } else if(scan == iTems[15].itemCode){
      //     return iTems[15].itemCode
      //   } else if(scan == iTems[16].itemCode){
      //     return iTems[16].itemCode
      //   } else if(scan == iTems[17].itemCode){
      //     return iTems[17].itemCode
      //   } else if(scan == iTems[18].itemCode){
      //     return iTems[18].itemCode
      //   } else if(scan == iTems[19].itemCode){
      //     return iTems[19].itemCode
      //   } else if(scan == iTems[20].itemCode){
      //     return iTems[20].itemCode
      //   } else if(scan == iTems[21].itemCode){
      //     return iTems[21].itemCode
      //   } else if(scan == iTems[22].itemCode){
      //     return iTems[22].itemCode
      //   } else if(scan == iTems[23].itemCode){
      //     return iTems[23].itemCode
      //   } else if(scan == iTems[24].itemCode){
      //     return iTems[24].itemCode
      //   }

      // }


      //var totalpriceResult = getCode();
     // console.log(totalpriceResult)











  }
  // create() {
  //   function getDescription(){
  //   if(this.itmeCode == this.items[0]?.itemCode){
  //   return this.items[0]?.itemDescription

  //   }else if(this.itmeCode == this.items[1]?.itemCode){
  //     return this.items[1]?.itemDescription

  //   }else if(this.itmeCode == this.items[2]?.itemCode){
  //     return this.items[2]?.itemDescription

  // }else if(this.itmeCode == this.items[3]?.itemCode){
  //   return this.items[3]?.itemDescription

  //   }
  // }
  // console.log(getDescription())
  // }

}
