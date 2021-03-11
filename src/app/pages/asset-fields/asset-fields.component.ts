import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetTypeComponent } from 'src/app/dialogs/asset-type/asset-type.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LocationCreateComponent } from 'src/app/dialogs/location-create/location-create.component';
import { ShelfCreateDialogComponent } from 'src/app/dialogs/shelf-create-dialog/shelf-create-dialog.component';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';

@Component({
  selector: 'app-asset-fields',
  templateUrl: './asset-fields.component.html',
  styleUrls: ['./asset-fields.component.css']
})
export class AssetFieldsComponent implements OnInit {
  displayedColumns = ['description','functions',]
  assets: Object;
  asset_type: any;

  @ViewChild(MatPaginator, {static: false}) Component

  constructor(private http: HttpClient, private dialog: MatDialog) {

    this.http.get('/api/asset').subscribe(res => {
      this.assets = res;
      console.log(this.assets);
    }, err => {
      console.log(err);
    });

    // ASSET TYPE
    this.http.get('/api/assettype').subscribe(res => {
      this.asset_type = res;
      this.asset_type = new MatTableDataSource(this.asset_type);
      this.asset_type.paginator = this.paginator;
      this.asset_type.sort = this.sort;
      console.log(this.asset_type);
    }, err => {
      console.log(err);
    });
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
   

  ngOnInit() {

    //asset type paginator and sort
    this.asset_type.paginator = this.paginator;
    this.asset_type.sort = this.sort;
  }

// Filter
applyFilter(filterValue: string) {
  this.asset_type.filter = filterValue.trim().toLowerCase();

  if (this.asset_type.paginator) {
    this.asset_type.paginator.firstPage();
  }
}


  openCreateAssetTypeDialog() {
    const dialogRef = this.dialog.open(AssetTypeComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {

      console.log('this si the data ', data)
      if (data) {
        console.log('this is asset number',data)

        this.http.post('/api/assettype/' , {

          text: data.text,



        }).subscribe(res => {

        }, err => {
          console.log(err);
        });
      }
    });
  }

  openCreateAssetLocationDialog(){
    const dialogRef = this.dialog.open(LocationCreateComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {

      console.log('this si the data ', data)
      if (data) {
        console.log('this is asset number',data)

        this.http.post('/api/location/' , {

          text: data.text,



        }).subscribe(res => {

        }, err => {
          console.log(err);
        });
      }
    });
  }

  openCreateAssetShelfDialog(){
    const dialogRef = this.dialog.open(ShelfCreateDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {

      console.log('this si the data ', data)
      if (data) {
        console.log('this is asset number',data)

        this.http.post('/api/shelf/' , {

          text: data.text,



        }).subscribe(res => {

        }, err => {
          console.log(err);
        });
      }
    });
  }

  openCreateAssetBinDialog(){
    const dialogRef = this.dialog.open(ShelfCreateDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {

      console.log('this si the data ', data)
      if (data) {
        console.log('this is asset number',data)

        this.http.post('/api/bin/' , {

          text: data.text,



        }).subscribe(res => {

        }, err => {
          console.log(err);
        });
      }
    });
  }

  //del asset type
  delete(AssetTypeId) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        AssetTypeId
      },
      disableClose: true,
      width: '800px'
    });
  
    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/assettype/' + AssetTypeId).subscribe(res => {
          console.log('Invoice deleted');
          if(Array.isArray(this.asset_type)){
            this.asset_type = this.asset_type.filter(q => q._id !== AssetTypeId);
            
          }
          this.asset_type.concat()

          this.http.get('/api/assettype').subscribe
          console.log(this.assets);
        });
      }
    });
  }


}
