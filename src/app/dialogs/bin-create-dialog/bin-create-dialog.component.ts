import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bin-create-dialog',
  templateUrl: './bin-create-dialog.component.html',
  styleUrls: ['./bin-create-dialog.component.css']
})
export class BinCreateDialogComponent implements OnInit {
  form: any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<BinCreateDialogComponent>) { }

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
