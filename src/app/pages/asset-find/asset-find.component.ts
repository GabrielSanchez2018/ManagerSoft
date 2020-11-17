import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AssetCheckoutComponent } from 'src/app/dialogs/asset-checkout/asset-checkout.component';

@Component({
  selector: 'app-asset-find',
  templateUrl: './asset-find.component.html',
  styleUrls: ['./asset-find.component.css']
})
export class AssetFindComponent implements OnInit {
  assets: Object;
  form: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dialogRef: any;


  constructor(
    private _formBuilder: FormBuilder ,private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar
  ) {


    this.http.get('api/asset/' ).subscribe(res =>{
      this.assets = res;
      console.log(this.assets)
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      assetNumber: [null, Validators.compose([Validators.required])]

    });

    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }


  login() {
    const assetNumber = this.form.controls["assetNumber"].value;
    console.log(assetNumber);
    this.http.get("/api/asset/" + assetNumber).subscribe(res => {
      if (res) {
        console.log('this is res', res)
        this.cookieService.set('AssetNumber', assetNumber, 1, '/', '', false, "Strict");

        //this.stepper
      //  this.router.navigate(["/asset-checkout"]);

       const dialogRef = this.dialog.open(AssetCheckoutComponent, {
        disableClose: true,
        width: '900px',

      });

      dialogRef.afterClosed().subscribe();


      } else {
        this.snackBar.open(
          "Item not found, please try again.",
          "ERROR",
          {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ['warning']
          }
        );

      }
    });
  }

  submit(){
    this.dialogRef.close(this.form.value);
  }

  close(){
    this.dialogRef.close();
  }

}
