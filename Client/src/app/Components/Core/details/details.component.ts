import { ProductService } from './../../../Services/product.service';
import { IProduct } from '../../../Interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})



export class DetailsComponent implements OnInit {


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


  constructor(private formBuilder: FormBuilder, private ProductApi : ProductService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.product.id = this.route.snapshot.params['id'];

        this.ProductApi.GetProductById(this.product.id).subscribe(d=>{

          this.product = d

        });
      }










}







