import { ProductService } from './../../../Services/product.service';
import { Title } from '@angular/platform-browser';
import { IProduct } from '../../../Interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})



export class ProductFormComponent implements OnInit {


  product: IProduct =
    {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0
      }
    }

  formGroup!: FormGroup;

  ImageUrl: string = "https://www.enwallpaper.com/wp-content/uploads/940a01a2575d4675343e8d10b62c9c09.jpg";

    ButtonAction :string = "Add Product";

  constructor(private formBuilder: FormBuilder, private ProductApi : ProductService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.product.id = this.route.snapshot.params['id'];
    if(this.product.id > 0)
      {
        this.ButtonAction = "Edit Product"
        this.ProductApi.GetProductById(this.product.id).subscribe(d=>{
          this.formGroup.setValue({
            title: d.title,
            price: d.price,
            imageLink: d.image
          });
          this.ImageUrl = d.image;
        });
      }

    // creating form group using the form builder
    this.formGroup = this.formBuilder.group({
      title:    ["",[Validators.required, Validators.minLength(2)]],
      price:    ["",[Validators.required, Validators.min(10), Validators.max(10000)]],
      imageLink:["",[Validators.required,  Validators.pattern(/^https:\/\/.{2,}/)]]
    });

  }


  Show() {
    this.ImageUrl = this.formGroup.value.imageLink;
  }


submit(e:Event){
  e.preventDefault();
if (this.formGroup.valid)
{
  this.product.title = this.formGroup.value.title;
  this.product.price = this.formGroup.value.price;
  this.product.image = this.formGroup.value.imageLink;
  if (this.route.snapshot.params['id'] == undefined)
  {
    this.ProductApi.addProductr(this.product).subscribe();
    this.router.navigate(['/products'])
  }
  else
  {
    this.ProductApi.Edit(this.product).subscribe();
    this.router.navigate(['/dashboard'])
  }
}
}

}







