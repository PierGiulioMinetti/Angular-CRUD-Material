import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { DialogComponent } from './dialog/dialog.component';
//MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud_material';

  productLis: any;

  //MATERIAL COPIED FROM TS TABLE
  displayedColumns: string[] = ['Product Name', 'Category', 'Condition', 'Price', 'Comment', 'Date', 'Id'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ****************************************************

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.getData();
  }

  openDialog() {
    //import the component "dialog"
    const dialogRef = this.dialog.open(DialogComponent, {

      width: '30%'
    })
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }



  getData() {
    this.api.getProduct().subscribe((res: any) => {
      console.log("data fetched!");
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.productLis = res;
    })
  }


  //COPIED FROM MATERIAL TS TABLE
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // *****************************************************
}