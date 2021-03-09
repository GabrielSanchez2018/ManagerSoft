import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-check-out-items',
  templateUrl: './check-out-items.component.html',
  styleUrls: ['./check-out-items.component.css']
})
export class CheckOutItemsComponent implements OnInit {
  displayedColumns = ['img','assetNumber',
  'assetTyp', 'assetModel', 'assetTypes', 'location', 'shelf','bin', 'date','functions'];
  checkeditems: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private domSanitizer: DomSanitizer) {

    this.http.get('/api/itemcheckout/itemgraph').subscribe(res => {
      this.checkeditems = res;

      this.checkeditems = new MatTableDataSource(this.checkeditems);
      this.checkeditems.paginator = this.paginator;
      this.checkeditems.sort = this.sort;
      console.log('items',this.checkeditems)

    }, err => {
      console.log(err);
    });
   }

   @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: false}) sort: MatSort;
    
   ngAfterViewInit() {
    this.checkeditems.paginator = this.paginator;
    this.checkeditems.sort = this.sort;
  }
  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.checkeditems.filter = filterValue.trim().toLowerCase();
  
    if (this.checkeditems.paginator) {
      this.checkeditems.paginator.firstPage();
    }
  }
}
