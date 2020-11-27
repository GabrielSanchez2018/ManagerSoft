import { Component, OnInit } from '@angular/core';
import { ItemCreateDialogComponent } from 'src/app/dialogs/item-create-dialog/item-create-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  displayedColumns = ['itemCode','itemDescription', 'itemPrice','itemType', 'itemQty','functions'];
  items: any;
  manualitems: any;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.http.get('/api/items').subscribe(res => {
      this.items = res;
      console.log(this.items)

      // var img = this.assets.img
      // img = 'data:image/png;base64,' + this.inspectionDetails.reportImage;
    }, err => {
      console.log(err);
    });


    /**
     * Manual Items
     */

      this.http.get('/api/manualitems').subscribe(res => {
        this.manualitems = res;
        console.log('items Manuales',this.manualitems)
  
        // var img = this.assets.img
        // img = 'data:image/png;base64,' + this.inspectionDetails.reportImage;
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

  openCreateItemDialog(){
    const dialogRef = this.dialog.open(ItemCreateDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {

      console.log('this si the data ', data)
      if (data) {
        console.log('this is asset number',data.image)

        this.http.post('/api/items/' , {

         itemCode: data.itemCode,
         itemDescription: data.itemDescription,
         itemPrice: data.itemPrice,
         itemType: data.itemType,
         itemQty: data.itemQty



        }).subscribe(res => {
          console.log("this is after sucribing", res)
          this.items = this.items.concat([res]);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  
  openManualCreateItemDialog(){
    const dialogRef = this.dialog.open(ItemCreateDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {

      console.log('this si the data ', data)
      if (data) {
        console.log('this is asset number',data.image)

        this.http.post('/api/manualitems/' , {

         itemCode: data.itemCode,
         itemDescription: data.itemDescription,
         itemPrice: data.itemPrice,
         itemType: data.itemType



        }).subscribe(res => {
          console.log("this is after sucribing", res)
          this.manualitems = this.manualitems.concat([res]);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  delete(ItemId) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        ItemId
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/items/' + ItemId).subscribe(res => {
          console.log('Item deleted');
          if(Array.isArray(this.items)){
            this.items = this.items.filter(q => q._id !== ItemId);

          }

          console.log(this.items);
        });
      }
    });
  }

  deleteManual(ManualItemId) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        ManualItemId
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/manualitems/' + ManualItemId).subscribe(res => {
          console.log('Item deleted');
          if(Array.isArray(this.manualitems)){
            this.manualitems = this.manualitems.filter(q => q._id !== ManualItemId);
          }

          console.log(this.manualitems);
        });
      }
    });
  }






}
