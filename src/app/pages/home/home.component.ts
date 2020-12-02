import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { element } from 'protractor';

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
  bydate: any;
  form: FormGroup;
  bydates: any[];

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

this.http.get('/api/customeraggregate/recordbydate').subscribe(res => {
  this.bydate = res;
  //Array
  // const test = this.bydate
  // console.log(test)
  // test.forEach(element => console.log('this is the element',element._id.bydate), element ),{

  // };

      /***
 * This function gives the day number of the year.
 */

var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
let diff = Math.abs( now.valueOf() - start.valueOf());
var oneday = 1000 * 60 * 60* 24;

var timerightnow = Math.floor(  oneday / diff);

var diffe = Math.abs( start.valueOf()- now.valueOf());
var numberoftheyear = Math.floor(diffe / (1000 * 3600 * 24));

console.log('this is the time now', numberoftheyear)

/**
* Funtion Ends ------
*/



  if(Array.isArray(this.bydate)){
    this.bydates = this.bydate.filter(element => element._id.date === numberoftheyear );
    console.log('ss',this.bydates)

  }

}, err => {
  console.log(err);
});

}

todayDate(){
  var today = new Date();
 return today
}


getTotalCost() {

  return this.bydates.map(t => t.totalprice).reduce((acc, value) => acc + value, 0);
}

  ngOnInit() {
    this.form = this.fb.group({
      description: [null, Validators.compose([Validators.required])],

      start:  new FormControl('', Validators.required),
      end:  new FormControl('', Validators.required)

    });
    console.log(this.form)
  }

}
