import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http : HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getProduct(id: number) : Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}api/products/${id}`);
  }
}
