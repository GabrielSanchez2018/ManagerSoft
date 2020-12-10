import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatFileUploadModule } from 'angular-material-fileupload';
//import { UploadService } from  '../upload.service';








@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.css']
})

export class AssetCreateComponent implements OnInit {
  public modeselect = 'domain';
  form: any;
  types: Object;

  selectedValue: string;
  selectedType: string;
  location: Object;
  shelf: Object;
  bin: Object;




  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  files  = [];


  constructor( private fb: FormBuilder, private dialogRef: MatDialogRef<AssetCreateComponent>, private http: HttpClient,) {
    interface types {
      value: string;
      viewValue: string;
    }
    /***
     * Asset Types Api
     */
    this.http.get('/api/assettype').subscribe(res => {
      this.types = res;
      console.log(this.types);
    }, err => {
      console.log(err);
    });

    /***
     * Asset Location API
     */
    this.http.get('/api/location').subscribe(res => {
      this.location = res;
      console.log(this.location);
    }, err => {
      console.log(err);
    });

    /***
     * Asset Shelf API
     */

    this.http.get('/api/shelf').subscribe(res => {
      this.shelf = res;
      console.log(this.shelf);
    }, err => {
      console.log(err);
    });

    /***
     * Asset Bin API
     *
     */

    this.http.get('/api/bin').subscribe(res => {
      this.bin = res;
      console.log(this.bin);
    }, err => {
      console.log(err);
    });
  }


  ngOnInit() {

    this.form=this.fb.group({
      assetNumber: [null, Validators.compose([Validators.required])],
      assetTyp: [null, Validators.compose([Validators.required])],
      assetModel: [null, Validators.compose([Validators.required])],
      types: [null, Validators.compose([Validators.required])],
      location: [null, Validators.compose([Validators.required])],
      shelf: [null, Validators.compose([Validators.required])],
      bin: [null, Validators.compose([Validators.required])],
      img: [null, Validators.compose([Validators.required])],

    });
    console.log('this asset type', this.form.img)
    console.log('selected', this.selectedValue)
  }

  submit(){
    this.dialogRef.close(this.form.value);
  }

  close(){
    this.dialogRef.close();
  }

//   onClick() {
//     const fileInput = this.fileInput.nativeElement;
//     fileInput .onchange = () => {
//         for (let index = 0; index < fileInput .files.length; index++)
//         {
//              const file = fileInput .files[index];
//              this.files.push({ data: file, inProgress: false, progress: 0});
//         }
//           this.upload();
//     };
//     fileInput.click();
// }



}



