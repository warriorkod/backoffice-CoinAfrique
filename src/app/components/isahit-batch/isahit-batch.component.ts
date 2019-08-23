import { OnInit, Component} from "@angular/core";
import { IsahitBatchStats, IsahitBatchStatsResponse } from "../../models/isahit";
import { IsahitService } from "../../services/isahit.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import swal from "sweetalert";

@Component({
  selector: 'isahit-batch',
  templateUrl: './isahit-batch.component.html',
  styleUrls: ['./isahit-batch.component.css']
})

export class IsahitBatchComponent implements OnInit {
  public currentPage: number = 1;
  public currentGotoPage: number = 1;

  public totalCount: number = 0;
  public batches: Array<IsahitBatchStats> = [];

  public filterBatchStatsForm: FormGroup
  public startDateFilter: string; // 2019-03-09T15:46:15.242902
  public endDateFilter: string; // 2019-03-09T15:46:15.242902
  public batchIdFilter: string;

  public pickerLabel: string

  public paginationResponse: any = {next: null, previous: null};
  public pageSize: number = 25;
  public pageQueryParams: string;

  public readonly pickerOptions: any = {
    locale: {
      cancelLabel: 'Réinitialiser',
      applyLabel: 'Appliquer'
    }
  }

  private readonly errorPageInput: any = {
    title: "Erreur !",
    to_high: "Vous avez entré un nombre de pages supérieur au nombre disponible.",
    to_low: "Vous avez entré un nombre de pages inférieur au nombre disponible.",
    null: "Vous devez entré un nombre de pages correcte.",
    alertType: "error"
  }

  private readonly pickerLabelText: string = 'Sélectionner les dates du filtre'
  private readonly dateFilterFormat: string = "YYYY-MM-DD[T]HH:mm:ss.SSSSSS"

  constructor(
    private isahitService: IsahitService
  ) {
  }

  public ngOnInit(): void {
    this.pickerLabel = this.pickerLabelText
    this.buildForm()
    this.reloadQueryParams()
    this.loadData()
  }

  public submitForm() {
    this.currentPage = 1;
    this.reloadQueryParams()
    this.loadData()
  }

  private buildForm(): void {
    this.filterBatchStatsForm = new FormGroup({
      startDateFilter: new FormControl('', [Validators.minLength(1)]),
      endDateFilter: new FormControl('', [Validators.minLength(1)]),
      batchIdFilter: new FormControl('', [Validators.minLength(1)])
    })

  this.filterBatchStatsForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  public selectedDate(value: any): void {
    this.startDateFilter = value.start.format(this.dateFilterFormat);
    this.endDateFilter = value.end.format(this.dateFilterFormat);

    const formattedStart = value.start.format('MM/DD/YYYY')
    const formattedEnd = value.end.format('MM/DD/YYYY')

    this.pickerLabel = `${formattedStart} - ${formattedEnd}`
  }

  public clearDaterangeValues(event: Event): void {
    this.pickerLabel = this.pickerLabelText
    this.startDateFilter = '';
    this.endDateFilter = '';
  }

  private onValueChanged(data: any) {
    if (data.batchIdFilter != null) {
      this.batchIdFilter = data.batchIdFilter
    }
  }

  private loadData(): void {
    this.isahitService.getBatchStats(this.pageQueryParams)
      .subscribe(
        (response: IsahitBatchStatsResponse) => {
          this.batches = response.results
          this.totalCount = response.count
        },
        (err: any) => {
          this.batches = []
          console.error(err)
        }
      )
  }

  private reloadQueryParams(): void {
    this.pageQueryParams = '?'
    this.pageQueryParams += this.getPaginationParams()
    this.pageQueryParams += this.getFilterParams()
  }

  private getFilterParams(): string {
    let query: string = '';

    if (this.startDateFilter) {
      query += `&creation_start=${this.startDateFilter}`
    }

    if (this.endDateFilter) {
      query += `&creation_end=${this.endDateFilter}`
    }

    if (this.batchIdFilter) {
      query += `&batch_id=${this.batchIdFilter}`
    }

    return query
  }

  public resetFilter(): void {
    this.currentPage = 1;
    this.endDateFilter = ''; 
    this.startDateFilter = '';
    this.batchIdFilter = '';
    this.pickerLabel = this.pickerLabelText
    this.reloadQueryParams()
    this.loadData()
    this.buildForm();
  }

  // ---- pagination infos ----

  private getPaginationParams(): string {
    return `page_size=${this.pageSize}&page=${this.currentPage}`
  }

  public get totalPagesCount(): number {
    return Math.ceil(this.totalCount / this.pageSize)
  }

  public isNextPageAvailable(): boolean {
    return this.currentPage > 0 && this.currentPage < this.totalPagesCount
  }

  public isPreviousPageAvailable(): boolean {
    return this.currentPage > 1
  }

  public getSpecificPage(pageNumber: number): void {
    if ((this.currentGotoPage > 0) && (this.currentGotoPage <= this.totalCount)) { 
      this.currentPage = pageNumber;
      this.currentGotoPage = pageNumber;// this.pageQueryParams = this.paginationResponse.next
      this.reloadQueryParams()
      this.loadData()
    } else {
      this.currentGotoPage = 1;
      if (this.currentGotoPage > 0) {
        swal(this.errorPageInput.title, this.errorPageInput.to_low, this.errorPageInput.alertType);
      } else if (this.currentGotoPage <= this.totalCount) {
        swal(this.errorPageInput.title, this.errorPageInput.to_high, this.errorPageInput.alertType);
      } else {
        swal(this.errorPageInput.title, this.errorPageInput.null, this.errorPageInput.alertType);
      }
    }
  }

  public getPreviousPage(): void {
    if (this.isPreviousPageAvailable()) {
      this.currentPage--
      // this.pageQueryParams = this.paginationResponse.previous
      this.reloadQueryParams()
      this.loadData()
    }
  }

  public getNextPage(): void {
    if (this.isNextPageAvailable()) {
      this.currentPage++
      // this.pageQueryParams = this.paginationResponse.next
      this.reloadQueryParams()
      this.loadData()
    }
  }
}
