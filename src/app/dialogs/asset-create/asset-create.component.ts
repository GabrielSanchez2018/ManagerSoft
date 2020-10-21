import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';






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


  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AssetCreateComponent>, private http: HttpClient,) {
    interface types {
      value: string;
      viewValue: string;
    }

    this.http.get('/api/assettype').subscribe(res => {
      this.types = res;
      console.log(this.types);
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

    });
    console.log('this asset type', this.form)
    console.log('selected', this.selectedValue)
  }

  submit(){
    this.dialogRef.close(this.form.value);
  }

  close(){
    this.dialogRef.close();
  }


}



