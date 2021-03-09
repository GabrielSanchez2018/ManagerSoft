import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { Router } from '@angular/router';
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

//   afuConfig = {
//     uploadAPI: {
//       url:"http://localhost:3000/api/asset/"
//     }
// };





  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  files  = [];
  fileUpload: any;
  image: File;
  asset: any;



  constructor(private router: Router, private fb: FormBuilder, private dialogRef: MatDialogRef<AssetCreateComponent>, private http: HttpClient,) {
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
//Imports fields from the form
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
    console.log('this asset type', this.form)
    console.log('selected', this.selectedValue)
  }

// imports the image when click in the select image button
  selectImage(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file
   }
  }


// Submit Button will get the image from the event and will get the remainding fields from the form
  submit(){
    //new form data for the picture
    const formdata = new FormData();
    //apend the image and the other fields
    formdata.append('img', this.image)
    formdata.append('assetNumber', this.form.value.assetNumber)
    formdata.append('assetTyp', this.form.value.assetTyp)
    formdata.append('assetModel', this.form.value.assetModel)
    formdata.append('types', this.form.value.types)
    formdata.append('location', this.form.value.location)
    formdata.append('shelf', this.form.value.shelf)
    formdata.append('bin', this.form.value.bin)



//this will send the form data to the api on asset.components.ts
    this.dialogRef.close(formdata);

}
// this will close the mondal

  close(){
    this.dialogRef.close();
    this.router.navigate(['/assets']);
    
  }



}



