import { Component, OnInit } from '@angular/core';
import { Product } from '../core/Product';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.getProducts(0, 8)
    .then(p => { this.products = p.items; })
    .catch(e => console.error(e));
  }
}
