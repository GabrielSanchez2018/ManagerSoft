import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, NgModel } from '@angular/forms';

@Component({
  selector: 'app-manual-item-create-dialog',
  templateUrl: './manual-item-create-dialog.component.html',
  styleUrls: ['./manual-item-create-dialog.component.css']
})
export class ManualItemCreateDialogComponent implements OnInit {
  form: any;
  items: Object;
  image: any;


  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ManualItemCreateDialogComponent>, private http: HttpClient,) {

    /***
     * Items API
     */
    this.http.get('/api/items').subscribe(res => {
      this.items = res;
      console.log(this.items);
    }, err => {
      console.log(err);
    });
  }




// imports the image when click in the select image button
selectImage(event){
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.image = file
 }
 console.log(this.image)
}

ngOnInit() {

  this.form=this.fb.group({
    itemCode: [null, Validators.compose([Validators.required])],
    itemDescription: [null, Validators.compose([Validators.required])],
    itemPrice: [null, Validators.compose([Validators.required])],
    itemType: [null, Validators.compose([Validators.required])],
    itemQty: [null, Validators.compose([Validators.required])],

});

}



// Submit Button will get the image from the event and will get the remainding fields from the form
submit(){
//new form data for the picture
const formdata = new FormData();
//apend the image and the other fields
formdata.append('img', this.image)
formdata.append('itemCode', this.form.value.itemCode)
formdata.append('itemDescription', this.form.value.itemDescription)
formdata.append('itemPrice', this.form.value.itemPrice)
formdata.append('itemType', this.form.value.itemType)
formdata.append('itemQty', this.form.value.itemQty)




//this will send the form data to the api on asset.components.ts
this.dialogRef.close(formdata);

}


close(){
  this.dialogRef.close();
}


}
