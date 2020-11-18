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

  ngOnInit() {

    this.form=this.fb.group({
      itemCode: [null, Validators.compose([Validators.required])],
      itemDescription: [null, Validators.compose([Validators.required])],
      itemPrice: [null, Validators.compose([Validators.required])],
      itemType: [null, Validators.compose([Validators.required])],

  });

}
submit(){
  this.dialogRef.close(this.form.value);
}

close(){
  this.dialogRef.close();
}


}