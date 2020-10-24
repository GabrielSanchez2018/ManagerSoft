import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {
  form: any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LocationCreateComponent>) { }

  ngOnInit() {
    this.form=this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  submit(){
    this.dialogRef.close(this.form.value);
  }

  close(){
    this.dialogRef.close();
  }

}
