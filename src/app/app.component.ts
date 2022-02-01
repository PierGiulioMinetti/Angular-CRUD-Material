import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud_material';

  constructor(private dialog: MatDialog) { }

  openDialog() {
    //import the component "dialog"
    const dialogRef = this.dialog.open(DialogComponent, {

      width: '30%'
    })


    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}