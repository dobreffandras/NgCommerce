import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStepperComponent } from './page-stepper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

  [{page: 1, totalPages: 1, expected: [1]}]
  .forEach(t => {
    it(`should show page numbers: ${t.expected} for test params: { page: ${t.page}, totalPages: ${t.totalPages} }`,
    () => {
      component.currentPage = t.page;
      component.totalPages = t.totalPages;
      expect(component.pageNumbers).toEqual(t.expected);
    });
  })
});
