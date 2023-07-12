import { Component } from '@angular/core';
import { ProductImageDirective } from './product-image.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

const PRODUCT_IMAGE_URL = "http://example.com/example.jpg";

@Component({
  template: `
  <div [productImage]="productImageUrl"></div>`
})
class TestComponent { 
  public productImageUrl : string = PRODUCT_IMAGE_URL;
}

describe('ProductImageDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ ProductImageDirective, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges(); // initial binding
  });

  it('should create an instance', () => {
    const directive = fixture.nativeElement;;
    expect(directive).toBeTruthy();
  });
});
