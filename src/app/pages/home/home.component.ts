import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customergraph: any;

  itemCount = [];
  labels = [];
  data: any;
  displayedColumns = ['description','price','count', 'total'];
  displayedColumns01 = ['date','description','price','count', 'total'];
  code: any;
  bydate: Object;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {

    /**
     * Graph
     */

    this.http.get('/api/customer/purchases-graph').subscribe(res => {
      this.customergraph = res;
      console.log(this.customergraph)

    //   for (const item of this.customergraph) {
    //     this.labels.push(item._id.title);
    //     this.itemCount.push(item.count);
    //     this.code.push(item._id.code);
    // }

    // // Build the object literal for the primeNG bar graph
    // this.data = {
    //     labels: this.labels, // label for services
    //     datasets: [
    //         // Graph object
    //         {
    //             backgroundColor: [
    //                 '#ED0A3F',
    //                 '#FF8833',
    //                 '#5FA777',
    //                 '#0066CC',
    //                 '#6B3FA0',
    //                 '#AF593E',
    //                 '#6CDAE7',
    //                 '#00FFFF',
    //                 '#FF00FF',
    //                 '#FAEBD7',
    //                 '#CD853F',
    //                 "#e6ecff",
    //                 "#99b3ff",
    //                 "#3366ff",
    //                 "#660000"
    //             ],
    //             color:[
    //               'white',
    //             ],
    //             hoverBackgroundColor: [
    //                 "#66ffcc",



    //             ],
    //             data: this.itemCount
    //         },
    //     ]
    // };
    // // Verify the data objects structure matches primeNG's expected format
    // console.log('Date object');
    // console.log(this.data);
}, err => {
    console.log(err);
});

this.http.get('/api/customer/recordbydate').subscribe(res => {
  this.bydate = res;
  console.log(this.customergraph)
}, err => {
  console.log(err);
});

}


  ngOnInit() {
  }

}
