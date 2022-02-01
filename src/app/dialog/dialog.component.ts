import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
//to close the dialog(modal)
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  //PROPERTIES
  conditionProducts = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;

  productLis: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    //to close the dialog(modal)
    private dialog: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });


  }

  saveProduct() {
    console.log(this.productForm.value);

    console.log(this.productForm.controls['category'].value);

    this.productForm.reset();

  }

  postProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.productForm.reset();
          //to close the dialog(modal)
          this.dialog.close();
          alert('product added succesfully!');
        },
        error: (err) => {
          console.log(err);
          alert(err);

        },
        complete: () => {
          alert('completed!');
        }
      })
    }
  }



}
