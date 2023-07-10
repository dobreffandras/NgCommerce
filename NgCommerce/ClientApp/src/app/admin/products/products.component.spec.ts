import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
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
    let row1Values = tableRowToValueList(table.rows[1]);
    let row2Values = tableRowToValueList(table.rows[2]);
    expect(row1Values).toEqual(['1', 'Product1', '', '']);
    expect(row2Values).toEqual(['2', 'Product2', '', '']);
  });

  it("should call backend endpoint for product creation", () => {
    // Given
    let component = TestBed.createComponent(ProductsComponent).componentInstance;
    httpTestingController.match({method: 'GET', url: '/api/products'})
    const newProduct = {id: 3, name: "Product3"};

    // When
    component.newProductForm.controls['name'].setValue(newProduct.name);
    component.OnSubmit();
    let req = httpTestingController.expectOne({method: "POST", url: "/api/products"});
    req.flush(newProduct);

    // Then
    expect(req.request)
    .toEqual(jasmine.objectContaining({
      method: 'POST',
      url: '/api/products',
      body: {
        name: newProduct.name, 
        description: '', 
        category: ''
      }}));
  });

  it("should append created product after successful submit", () => {
    // Given
    const fixture = TestBed.createComponent(ProductsComponent);
    let component = fixture.componentInstance;
    httpTestingController
      .expectOne({method: 'GET', url: '/api/products'})
      .flush([{ id: 1, name: "Product1" }, { id: 2, name: "Product2" }]);
    const newProduct = { id: 3, name: "Product3" };

    // When
    component.newProductForm.controls['name'].setValue(newProduct.name);
    component.OnSubmit();
    let req = httpTestingController.expectOne({method: "POST", url: "/api/products"});
    req.flush(newProduct);
    fixture.detectChanges();

    // Then
    let table = (<HTMLElement>fixture.nativeElement).querySelector("table")!;
    expect(table.rows.length).toEqual(4);
    let lastRowValues = tableRowToValueList(table.rows[3]);
    expect(lastRowValues).toEqual([newProduct.id.toString(), newProduct.name, '', '']);
  });

  it("should show error message when request fails", () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    // Given
    let component = fixture.componentInstance;
    httpTestingController
      .expectOne({method: 'GET', url: '/api/products'})
      .flush([{ id: 1, name: "Product1" }, { id: 2, name: "Product2" }]);
    const newProduct = { id: 3, name: "Product3" };
    const errorMessage = `Product with name ${newProduct.name} already exists`;

    // When
    component.newProductForm.controls['name'].setValue(newProduct.name);
    component.OnSubmit();
    httpTestingController
      .expectOne({method: "POST", url: "/api/products"})
      .flush(errorMessage, {status: 400, statusText: 'Bad Request'});
    fixture.detectChanges();

    // Then
    let errorDiv = fixture.nativeElement.querySelector(".alert");
    expect(errorDiv?.innerHTML.trim()).toBe(errorMessage);
  });

  let tableRowToValueList = (tableRow: HTMLTableRowElement) => {
    return Array.from(tableRow.children).map(e => e.innerHTML)
  }
});
