import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductsComponent } from "./products.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("ProductsComponent", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule, FormsModule, ReactiveFormsModule],
      declarations: [ProductsComponent],
      providers: [
        { provide: 'BASE_URL', useValue: '/' }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should load products on creation", () => {
    TestBed.createComponent(ProductsComponent);
    let req = httpTestingController.expectOne("/api/products");
    expect(req.request.method).toEqual('GET');
  });

  it("should show loaded products after creation", () => {
    // Given
    let fixture = TestBed.createComponent(ProductsComponent);
    let req = httpTestingController.expectOne("/api/products");
    
    // When
    req.flush([{ id: 1, name: "Product1" }, { id: 2, name: "Product2" }]);
    fixture.detectChanges();
    
    // Then
    let table = (<HTMLElement>fixture.nativeElement).querySelector("table")!;
    let row1Values = Array.from(table.rows[1].children).map(e => e.innerHTML);
    let row2Values = Array.from(table.rows[2].children).map(e => e.innerHTML);
    expect(row1Values).toEqual(['1', 'Product1', '', '']);
    expect(row2Values).toEqual(['2', 'Product2', '', '']);
  });
});
