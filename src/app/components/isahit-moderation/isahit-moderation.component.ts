import { OnInit, Component, Input } from "@angular/core";
import { IsahitTask, IsahitTasksResponse} from '../../models/isahit';
import { IsahitService } from "../../services/isahit.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import swal from "sweetalert"

@Component({
  selector: 'isahit-moderation',
  templateUrl: './isahit-moderation.component.html',
  styleUrls: ['./isahit-moderation.component.css']
})

export class IsahitModerationComponent implements OnInit {

  @Input() batch_id: string|number;

  public _pendingTasksFilterQuery: string = '&task_status=pending';
  
  public currentPage: number = 1;
  public currentGotoPage: number = 1;
  public totalCount: number = 0;
  public reports: Array<Object>;
  public reportsQuery: string = "";
  public paginationQuery: string = "";
  public isahitTask: any = [];

  public totalPending: number = 0;
  public total: number = 0;
  public pendingTasks: Array<IsahitTask> = [];

  public paginationResponse: any = {next: null, previous: null};
  public pageSize: number = 25;
  public pageQueryParams: string;

  public filterModerationForm: FormGroup;
  public adsIdFilter: string = "";
  public selectedAdId: string;

  private readonly errorPageInput: any = {
    title: "Erreur !",
    to_high: "Vous avez entré un nombre de pages supérieur au nombre disponible.",
    to_low: "Vous avez entré un nombre de pages inférieur au nombre disponible.",
    null: "Vous devez entré un nombre de pages correcte.",
    alertType: "error"
  }

  public readonly taskCreationStatuses: { [key: string]: string } = {
    "failed": "badge-danger",
    "pending": "badge-warning",
    "created": "badge-info",
    "done": "badge-success"
  }

  constructor(
    private isahitService: IsahitService
  ) {
    this.buildForm();
    this.reports = [];
  }

  public ngOnInit(): void {
    this.buildForm()
    this.reloadQueryParams()
    this.loadTask()
  }

  public submitForm(formValue?: any): void {
    this.currentPage = 1;
    this.checkEmptyField();
    this.reloadQueryParams()
    this.loadTask()
  }

  public checkEmptyField(): void {
  }

  private onValueChanged(data: any): void {
    console.log(data);
    if  (data) {
      this.pendingTasksFilterQuery = data.searchFilterModeration.trim()
    }
  }

  private buildForm(): void {
    this.filterModerationForm = new FormGroup({
        searchFilterModeration: new FormControl(
          '',
          [Validators.minLength(1), Validators.required]
        )
      })
    this.filterModerationForm.valueChanges.subscribe(data => this.onValueChanged(data))
  }

  private queryReportPagination(): void {
    this.paginationQuery = "?page_size=" + this.pageSize;
    this.paginationQuery = this.paginationQuery + "&page=" + String(this.currentPage);
  }

  private pendingTasksQueryParams(): string {
    let queryParam: string = '';

    this.queryReportPagination();
    queryParam += this.paginationQuery
    queryParam += this.pendingTasksFilterQuery

    return queryParam;
  }

  get pendingTasksFilterQuery(): string {
    return this._pendingTasksFilterQuery
  }

  set pendingTasksFilterQuery(value: string) {
    let _query: string = '';
    _query += '&task_status=pending'

    if (value) {
      _query += `&ad_id=${value}`
    }

    this._pendingTasksFilterQuery = _query
  }

  private loadTask(): void {
    const params = this.pendingTasksQueryParams()
    this.isahitService.getIsahitTask(params)
    .subscribe((response: IsahitTasksResponse) => {
      this.pendingTasks = response.results
      this.totalPending = response.count
      this.totalCount = response.count % this.pageSize;
    })
  }

  public resetFilter(): void {
    this._pendingTasksFilterQuery = "";
    this.paginationQuery = "";
    this.adsIdFilter = "";
    this.buildForm();
    this.currentPage = 1;
    this.currentGotoPage = 1;
    this.reloadQueryParams();
    this.loadTask();
  }

  private reloadQueryParams(): void {
    this.pendingTasksQueryParams();
  }

  private getPaginationParams(): string {
    return `page_size=${this.pageSize}&page=${this.currentPage}`
  }

  public get totalPagesCount(): number {
    return Math.round(this.reports.length / this.pageSize) + 1
  }

  public isNextPageAvailable(): boolean {
    return (this.currentPage > 0) && (this.currentPage < this.totalCount)
  }

  public isPreviousPageAvailable(): boolean {
    return this.currentPage > 1
  }

  public getPreviousPage(): void {
    if (this.isPreviousPageAvailable()) {
      this.currentPage--
      this.currentGotoPage = this.currentPage
      this.reloadQueryParams()
      this.loadTask()
    }
  }

  public getSpecificPage(pageNumber: number): void {
    if ((this.currentGotoPage > 0) && (this.currentGotoPage <= this.totalCount)) { 
      this.currentPage = pageNumber;
      this.currentGotoPage = pageNumber;
      this.reloadQueryParams()
      this.loadTask()
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

  public getNextPage(): void {
    if (this.isNextPageAvailable()) {
      this.currentPage++
      this.currentGotoPage = this.currentPage
      this.reloadQueryParams()
      this.loadTask()
    }
  }

  public getTaskStatusClass(statusName: string): string {
    return this.taskCreationStatuses[statusName] || ''
  }

  public showAdPopup(task: IsahitTask): void {
    this.selectedAdId = task.ad_id
  }

  public resetSelectedAdId(event: Event): void {
    this.selectedAdId = null;
  }
}
