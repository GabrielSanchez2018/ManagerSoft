import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shelf-create-dialog',
  templateUrl: './shelf-create-dialog.component.html',
  styleUrls: ['./shelf-create-dialog.component.css']
})
export class ShelfCreateDialogComponent implements OnInit {
  form: any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ShelfCreateDialogComponent>) { }

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
