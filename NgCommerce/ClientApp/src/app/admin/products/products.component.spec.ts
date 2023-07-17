import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ProductsComponent } from "./products.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductsService } from "src/app/core/services/products.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

describe("ProductsComponent", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule],
      declarations: [ProductsComponent],
      providers: [
        { provide: 'BASE_URL', useValue: '/' }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    TestBed.inject(ProductsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should load products on creation", async () => {
    let component = TestBed.createComponent(ProductsComponent).componentInstance;
    await component.ngOnInit();
    let req = httpTestingController.expectOne("/api/products?page=0&itemsPerPage=16");
    expect(req.request.method).toEqual('GET');
  });

  it("should show loaded products after creation", async () => {
    // Given
    let fixture = TestBed.createComponent(ProductsComponent);

    // When
    fixture.detectChanges(); // Calls ngOnInit
    httpTestingController
      .expectOne("/api/products?page=0&itemsPerPage=16")
      .flush({
        items: [{ id: 1, name: "Product1", price: 3 }, { id: 2, name: "Product2", price: 5 }],
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 16
      });
    await fixture.whenStable(); // wait HTTP call observables
    fixture.detectChanges(); // sync DOM

    // Then
    let table = (<HTMLElement>fixture.nativeElement).querySelector("table")!;
    let row1Values = productsTableRowValues(table.rows[1]);
    let row2Values = productsTableRowValues(table.rows[2]);
    expect(row1Values).toEqual({
      id: '1',
      name: 'Product1',
      price: '3',
      coverImageUrl: undefined,
      description: '',
      category: ''
    });
    expect(row2Values).toEqual({
      id: '2',
      name: 'Product2',
      price: '5',
      coverImageUrl: undefined,
      description: '',
      category: ''
    });
  });

  it("should call backend endpoint for product creation", () => {
    // Given
    let component = TestBed.createComponent(ProductsComponent).componentInstance;
    httpTestingController.match({ method: 'GET', url: '/api/products' })
    const newProduct = { id: 3, name: "Product3", price: 10 };

    // When
    component.newProductForm.controls['name'].setValue(newProduct.name);
    component.newProductForm.controls['price'].setValue(newProduct.price);
    component.OnSubmit();
    let req = httpTestingController.expectOne({ method: "POST", url: "/api/products" });
    req.flush(newProduct);

    // Then
    expect(req.request)
      .toEqual(jasmine.objectContaining({
        method: 'POST',
        url: '/api/products',
        body: {
          name: newProduct.name,
          description: '',
          category: '',
          price: newProduct.price,
          coverImageUrl: '',
        }
      }));
  });

  it("should append created product after successful submit", async () => {
    // Given
    const fixture = TestBed.createComponent(ProductsComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges(); // calls ngOnInit
    httpTestingController
      .expectOne({ method: 'GET', url: '/api/products?page=0&itemsPerPage=16' })
      .flush({
        items: [{ id: 1, name: "Product1", price: 0 }, { id: 2, name: "Product2", price: 0 }],
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 16
      });
    const newProduct = { id: 3, name: "Product3", price: 15 };
    await fixture.whenStable(); // wait HTTP call observables
    fixture.detectChanges(); // sync DOM
    

    // When
    component.newProductForm.controls['name'].setValue(newProduct.name);
    component.OnSubmit();
    httpTestingController
      .expectOne({ method: "POST", url: "/api/products" })
      .flush(newProduct);
    await fixture.whenStable(); // wait HTTP call observables
    fixture.detectChanges(); // sync DOM

    // Then
    let table = (<HTMLElement>fixture.nativeElement).querySelector("table")!;
    expect(table.rows.length).toEqual(4);
    let lastRowValues = productsTableRowValues(table.rows[3]);
    expect(lastRowValues).toEqual({
      id: newProduct.id.toString(),
      name: newProduct.name,
      price: '15',
      coverImageUrl: undefined,
      description: '',
      category: ''
    });
  });

  it("should show error message when request fails", async () => {
    // Given
    const fixture = TestBed.createComponent(ProductsComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges(); // calls ngOnInit
    httpTestingController
      .expectOne({ method: 'GET', url: '/api/products?page=0&itemsPerPage=16' })
      .flush({
        items: [{ id: 1, name: "Product1" }, { id: 2, name: "Product2" }],
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 16
      });
    const newProduct = { id: 3, name: "Product3" };
    const errorMessage = `Product with name ${newProduct.name} already exists`;
    await fixture.whenStable(); // wait HTTP call observables
    fixture.detectChanges(); // sync DOM

    // When
    component.newProductForm.controls['name'].setValue(newProduct.name);
    component.OnSubmit();
    httpTestingController
      .expectOne({ method: "POST", url: "/api/products" })
      .flush(errorMessage, { status: 400, statusText: 'Bad Request' });
    await fixture.whenStable(); // wait HTTP call observables
    fixture.detectChanges(); // sync DOM

    // Then
    let errorDiv = fixture.nativeElement.querySelector(".alert");
    expect(errorDiv?.innerHTML.trim()).toBe(errorMessage);
  });

  let productsTableRowValues = (tableRow: HTMLTableRowElement): ProductsTableRowValues => {
    let cells = tableRow.children;
    return {
      id: cells.item(0)?.innerHTML,
      name: cells.item(1)?.innerHTML,
      price: cells.item(2)?.innerHTML,
      coverImageUrl: cells.item(3)?.attributes.getNamedItem('src')?.value,
      description: cells.item(4)?.innerHTML,
      category: cells.item(5)?.innerHTML,
    }
  }

  interface ProductsTableRowValues {
    id: string | undefined,
    name: string | undefined,
    price: string | undefined,
    coverImageUrl: string | undefined,
    description: string | undefined,
    category: string | undefined,
  }
});
