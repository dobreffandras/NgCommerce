import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchAll } from 'rxjs';
import { Product } from 'src/app/core/Product';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() public product : Product | undefined;
  public addToCartAmount : number = 1;
  
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      map(p => this.productsService.getProduct(p['id'])),
      switchAll(),
    )
    .subscribe(p => {
      this.product = p;
    });
  }

  onIncrease() {
    this.addToCartAmount++;
  }

  onDecrease() {
    if(1 < this.addToCartAmount) {
      this.addToCartAmount--;
    } 
  }
}
