import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { CountryService, ICountry } from 'app/services/country.service';
import { FormGroup, FormControl, } from '@angular/forms';


@Component({
  selector: 'bo-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Output() paginationUrl: EventEmitter<string> = new EventEmitter<string>()

  @Input() totalCount: number
  @Input() pageSize: number = 25;

  public paginationResponse: any = {next: null, previous: null};

  public pageQueryParams: string;
  public paginationQuery: string = "";

  public currentPage: number = 1

  public readonly LABELS_FR = {
    selectPage: "Aller à la page",
    next: "Suivant",
    prev: "Précédent",
    apply: "Aller"
  }

  constructor(
  ) {
  }

  public getPaginationParams(): string {
    return `page_size=${this.pageSize}&page=${this.currentPage}`
  }

  private emitPaginationUrl(): void {
    this.paginationUrl.emit(this.getPaginationParams())
  }

  public get totalPagesCount(): number {
    return Math.ceil(this.totalCount / this.pageSize)
  }

  public isNextPageAvailable(): boolean {
    return (this.currentPage > 0) && (this.currentPage < this.totalPagesCount)
  }

  public isPreviousPageAvailable(): boolean {
    return this.currentPage > 1
  }

  public getPreviousPage(): void {
    if (this.isPreviousPageAvailable()) {
      this.currentPage--
      this.reloadQueryParams()
    }
  }

  public getPageCout(totalCount: number): number {
    return totalCount % this.pageSize;
  }

  private reloadQueryParams(isEmitParams: boolean = true): void {
    this.paginationQuery = "?page_size=" + this.pageSize;
    this.paginationQuery = this.paginationQuery + "&page=" + String(this.currentPage);

    if (isEmitParams) {
      this.emitPaginationUrl()
    }
  }

  public getSpecificPage(pageNumber: number): void {
    if ((this.currentPage > 0) && (this.currentPage <= this.totalCount)) { 
      this.currentPage = pageNumber;
      this.currentPage = pageNumber;
      this.reloadQueryParams()
    } 
  }

  public getNextPage(): void {
    if (this.isNextPageAvailable()) {
      this.currentPage++
      this.reloadQueryParams()
    }
  }
}
