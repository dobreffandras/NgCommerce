import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStepperComponent } from './page-stepper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as exp from 'constants';

describe('PageStepperComponent', () => {
  let component: PageStepperComponent;
  let fixture: ComponentFixture<PageStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageStepperComponent ],
      imports: [FontAwesomeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    // Note: shown numbers is max 5 by default
    {page: 1, totalPages: 1, expected: [1]},
    {page: 1, totalPages: 2, expected: [1, 2]},
    {page: 1, totalPages: 5, expected: [1, 2, 3, 4, 5]},
    {page: 3, totalPages: 5, expected: [1, 2, 3, 4, 5]},
    {page: 3, totalPages: 7, expected: [1, 2, 3, 4, 5]},
    {page: 4, totalPages: 7, expected: [2, 3, 4, 5, 6]},
    {page: 5, totalPages: 7, expected: [3, 4, 5, 6, 7]},
    {page: 6, totalPages: 7, expected: [3, 4, 5, 6, 7]},
    {page: 7, totalPages: 7, expected: [3, 4, 5, 6, 7]},
    {page: 1456, totalPages: 2000, expected: [1454, 1455, 1456, 1457, 1458]},
  ]
  .forEach(t => {
    it(`should show page numbers: ${t.expected} for test params: { page: ${t.page}, totalPages: ${t.totalPages} }`,
    () => {
      component.currentPage = t.page;
      component.totalPages = t.totalPages;
      expect(component.pageNumbers).toEqual(t.expected);
    });
  });

  [
    {page: 1, totalPages: 1, expected: 1},
    {page: 1, totalPages: 2, expected: 1},
    {page: 1, totalPages: 5, expected: 1},
    {page: 3, totalPages: 5, expected: 3},
    {page: 3, totalPages: 7, expected: 3},
    {page: 4, totalPages: 7, expected: 4},
    {page: 5, totalPages: 7, expected: 5},
    {page: 6, totalPages: 7, expected: 6},
    {page: 7, totalPages: 7, expected: 7},
    {page: 1456, totalPages: 2000, expected: 1456},
  ]
  .forEach(t => {
    it(`should highlight page ${t.expected} for test params: { page: ${t.page}, totalPages: ${t.totalPages} }`,
    () => {
      component.currentPage = t.page;
      component.totalPages = t.totalPages;
      fixture.detectChanges();

      var currentNumberElement = 
        (<HTMLElement>fixture.nativeElement).querySelector("li.page-stepper-disabled:not(.stepper-arrow)");
      var number = currentNumberElement?.querySelector("a")?.innerHTML;
      expect(number).toBeDefined();
      expect(Number.parseInt(number!)).toEqual(t.expected);
    });
  });

  [
    {page: 1, totalPages: 1, expected: {leftDisabled: true, rightDisabled: true}},
    {page: 1, totalPages: 2, expected: {leftDisabled: true, rightDisabled: false}},
    {page: 1, totalPages: 5, expected: {leftDisabled: true, rightDisabled: false}},
    {page: 3, totalPages: 5, expected: {leftDisabled: false, rightDisabled: false}},
    {page: 3, totalPages: 7, expected: {leftDisabled: false, rightDisabled: false}},
    {page: 4, totalPages: 7, expected: {leftDisabled: false, rightDisabled: false}},
    {page: 5, totalPages: 7, expected: {leftDisabled: false, rightDisabled: false}},
    {page: 6, totalPages: 7, expected: {leftDisabled: false, rightDisabled: false}},
    {page: 7, totalPages: 7, expected: {leftDisabled: false, rightDisabled: true}},
    {page: 1456, totalPages: 2000, expected: {leftDisabled: false, rightDisabled: false}},
  ]
  .forEach(t => {
    it(`should disable arrows ${JSON.stringify(t.expected)} for test params: { page: ${t.page}, totalPages: ${t.totalPages} }`,
    () => {
      component.currentPage = t.page;
      component.totalPages = t.totalPages;
      fixture.detectChanges();

      let list = (<HTMLElement>fixture.nativeElement).querySelector("ul")!;
      let leftArrow = list.children[0];
      let rightArrow = list.children[list.children.length - 1];

      var leftDisabled = leftArrow.classList.contains("page-stepper-disabled");
      var rightDisabled = rightArrow.classList.contains("page-stepper-disabled");
      expect(leftDisabled).toBe(t.expected.leftDisabled, "left arrow is disabled");
      expect(rightDisabled).toBe(t.expected.rightDisabled, "right arrow is disabled");
    });
  });
});
