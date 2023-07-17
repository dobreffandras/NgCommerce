import { Component, Input } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'page-stepper',
  templateUrl: './page-stepper.component.html',
  styleUrls: ['./page-stepper.component.scss']
})
export class PageStepperComponent {
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() shownPageCount: number = 5;

  get pageNumbers(): number[] {
    let start = this.currentPage - Math.floor(this.shownPageCount / 2);
    start = 0 < start
      ? start 
      : 1;
    start = start < this.totalPages - this.shownPageCount + 1
      ? start 
      : this.totalPages - this.shownPageCount + 1;
    start = 0 < start
      ? start 
      : 1;

    let shownPages = this.shownPageCount < this.totalPages ? this.shownPageCount : this.totalPages;
    return this.range(start, shownPages);
  }

  OnPageClicked(pageNum: number) {
    this.currentPage = pageNum;
  }

  OnArrowLeftClicked() {
    this.currentPage = 1 < this.currentPage ? this.currentPage - 1 : 1;
  }
  
  OnArrowRightClicked() {
    this.currentPage = this.currentPage < this.totalPages ? this.currentPage +1  : this.totalPages;
  }

  range(start: number, count: number) {
    return [...Array(count)].map((_, i) => i + start);
  }
}
