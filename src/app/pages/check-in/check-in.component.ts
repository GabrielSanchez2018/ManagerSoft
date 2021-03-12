import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AssetCheckoutComponent } from 'src/app/dialogs/asset-checkout/asset-checkout.component';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  assets: any;
  form: FormGroup;
  dialogRef: any;

  constructor(private _formBuilder: FormBuilder ,private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) { 
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
    
  }

  checkIn() {
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
