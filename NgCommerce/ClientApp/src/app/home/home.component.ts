import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../core/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  public products : Product[] = [];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit(): void {
    this.http.get<Product[]>(this.baseUrl + 'api/products')
      .subscribe({
        next: p => { this.products = p; },
        error: e => console.error(e)
      });
  }
}
