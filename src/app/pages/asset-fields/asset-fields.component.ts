import { Component, OnInit } from '@angular/core';
import { AssetTypeComponent } from 'src/app/dialogs/asset-type/asset-type.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { LocationCreateComponent } from 'src/app/dialogs/location-create/location-create.component';

@Component({
  selector: 'app-asset-fields',
  templateUrl: './asset-fields.component.html',
  styleUrls: ['./asset-fields.component.css']
})
export class AssetFieldsComponent implements OnInit {
  assets: Object;

  constructor(private http: HttpClient, private dialog: MatDialog) {

    this.http.get('/api/asset').subscribe(res => {
      this.assets = res;
      console.log(this.assets);
    }, err => {
      console.log(err);
    });
  }
   

  ngOnInit() {
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

}
