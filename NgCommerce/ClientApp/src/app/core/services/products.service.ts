import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../Product';
import { NewProduct } from '../NewProduct';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(
    private http : HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getProducts() : Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(this.baseUrl + 'api/products'));
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
