import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() onPageSelected = new EventEmitter<number>();

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
    let selectedPage = pageNum;
    this.onPageSelected.emit(selectedPage);
  }

  OnArrowLeftClicked() {
    let selectedPage = 1 < this.currentPage ? this.currentPage - 1 : 1;
    this.onPageSelected.emit(selectedPage);
  }
  
  OnArrowRightClicked() {
    let selectedPage = this.currentPage < this.totalPages ? this.currentPage +1  : this.totalPages;
    this.onPageSelected.emit(selectedPage);
  }

  range(start: number, count: number) {
    return [...Array(count)].map((_, i) => i + start);
  }
}
