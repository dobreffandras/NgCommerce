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
  public productsCurrentPage = 1;
  public productsTotalPages = 1;
  public productsPerPage = 8;
  public productListLoading = false;

  constructor(
    private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productListLoading = true;
    this.productsService.getProducts(0, this.productsPerPage)
    .then(p => {
       this.products = p.items;
       this.productsCurrentPage = p.currentPage + 1;
       this.productsTotalPages = p.totalPages;
      })
    .catch(e => console.error(e))
    .finally(() =>{
      this.productListLoading = false;
    });
  }

  onProductsPageSelected(page: number) {
    this.productListLoading = true;
    this.productsService.getProducts(page - 1, this.productsPerPage)
    .then(p => {
       this.products = p.items;
       this.productsCurrentPage = p.currentPage + 1;
       this.productsTotalPages = p.totalPages;
    })
    .catch(e => console.error(e))
    .finally(() => {
      this.productListLoading = false;
    });
  }
}
