import { Component, OnInit ,ViewChild, ViewChildren, AfterViewInit} from '@angular/core';
//import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import {HttpClient} from '@angular/common/http';
import { AssetCreateComponent } from '../../dialogs/asset-create/asset-create.component';
import { AssetTypeComponent } from 'src/app/dialogs/asset-type/asset-type.component';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { MatPaginator, MatSort ,MatTableDataSource } from '@angular/material';




@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  dataSource: any;

   

  
 

  

  assets: any;
  assetNumber: any;
  assetTyp: any;
  assetModel: any;
  locations: any;
  form: any;
  concat: any;
  displayedColumns = ['arrayNumber','assetNumber',
  'assetTyp', 'assetModel', 'assetTypes', 'location', 'shelf','bin', 'date','functions'];






  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.http.get('/api/asset').subscribe(res => {
      this.assets = res;
    }, err => {
      console.log(err);
    });



  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;




  

ngOnInit(){
  this.http.get('/api/asset').subscribe(res => {

  this.assets = res;

  this.assets = new MatTableDataSource(this.assets);

  this.assets.paginator = this.paginator;
  this.assets.sort = this.sort;

    console.log(this.assets);
  }, err => {
    console.log(err);
  });



}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
//Create new asset

openCreateAssetDialog() {
  const dialogRef = this.dialog.open(AssetCreateComponent, {
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(data => {

    console.log('this si the data ', data)
    if (data) {
      console.log('this is asset number', this.assets.length)

      this.http.post('/api/asset/' , {

        assetNumber: data.assetNumber,
        assetTyp: data.assetTyp,
        assetModel: data.assetModel,
        types: data.types,
        location: data.location,
        shelf: data.shelf,
        bin: data.bin,
        arrayNumber: this.assets.length + 1



      }).subscribe(res => {
        console.log("this is after sucribing", res)
        this.assets = this.assets.concat([res]);
      }, err => {
        console.log(err);
      });
    }
  });
}


delete(AssetId) {
  const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
    data: {
      AssetId
    },
    disableClose: true,
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result =>{
    if (result === 'confirm'){
      this.http.delete('/api/asset/' + AssetId).subscribe(res => {
        console.log('Invoice deleted');
        if(Array.isArray(this.assets)){
          this.assets = this.assets.filter(q => q._id !== AssetId);

        }

        console.log(this.assets);
      });
    }
  });
}


}
