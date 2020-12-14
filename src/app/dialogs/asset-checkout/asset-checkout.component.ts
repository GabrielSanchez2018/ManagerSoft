import { Component, OnInit ,ViewChild, ViewChildren} from '@angular/core';
//import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {HttpClient} from '@angular/common/http';
import { AssetCreateComponent } from '../../dialogs/asset-create/asset-create.component';
import { AssetTypeComponent } from 'src/app/dialogs/asset-type/asset-type.component';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { MatPaginator, MatSort ,MatTableDataSource } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-asset-checkout',
  templateUrl: './asset-checkout.component.html',
  styleUrls: ['./asset-checkout.component.css']
})
export class AssetCheckoutComponent implements OnInit {
  displayedColumns = ['image','assetNumber',
  'assetTyp', 'assetModel', 'assetTypes', 'location', 'shelf','bin', 'date'];
  asset: any;
  AssetNumber: string;
  form: any;
  private _id: string;

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<AssetCheckoutComponent>, private cookieService: CookieService) {
    this.AssetNumber = this.cookieService.get('AssetNumber');
    this.http.get('/api/asset/' ).subscribe(res => {

      if(Array.isArray(res)){
        this.asset = res.filter(q => q.assetNumber === this.AssetNumber);;
      }
      console.log('this asset in page checkout', this.asset[0]._id)
    }, err => {
      console.log(err);
    });

  }

  ngOnInit() {
  }

  delete(){
    console.log('we are going to delete this id',this.asset[0]._id)
    this.http.delete('/api/asset/' + this.asset[0]._id).subscribe(res => {
              console.log('Invoice deleted');
              this.dialogRef.close();

              })




    // delete(AssetId) {
    //   const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
    //     data: {
    //       AssetId
    //     },
    //     disableClose: true,
    //     width: '800px'
    //   });

    //   dialogRef.afterClosed().subscribe(result =>{
    //     if (result === 'confirm'){
    //       this.http.delete('/api/asset/' + AssetId).subscribe(res => {
    //         console.log('Invoice deleted');
    //         if(Array.isArray(this.assets)){
    //           this.assets = this.assets.filter(q => q._id !== AssetId);

    //         }

    //         console.log(this.assets);
    //       });
    //     }
    //   });
    // }

  }

  close(){
    this.dialogRef.close();
  }


}
