import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../Product';
import { NewProduct } from '../NewProduct';
import { Observable, firstValueFrom, map } from 'rxjs';
import { Paged } from './Paged';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(
    private http : HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getProducts(
    page: number = 0,
    itemsPerPage: number = 16
  ) : Promise<Paged<Product>> {
    return firstValueFrom(this.http.get<Paged<Product>>(
      `${this.baseUrl}api/products`,
      {
        params: { page, itemsPerPage } 
      }));
  }

  getProduct(id: number) : Promise<Product> {
    return firstValueFrom(this.http.get<Product>(`${this.baseUrl}api/products/${id}`));
  }

  createProduct(newProduct : NewProduct) : Promise<Product> {
    return firstValueFrom(this.http.post<Product>(
      this.baseUrl + 'api/products',
      newProduct));
  }

  updateProduct(product: Product) : Promise<Product> {
    return firstValueFrom(this.http.put<Product>(
      this.baseUrl + 'api/products',
      product));
  }
  
  deleteProduct(id: number) : Promise<void> {
    return firstValueFrom(
      this.http
      .delete(this.baseUrl + 'api/products/' + id)
      .pipe(map(_=> void(0))));
  }
}
