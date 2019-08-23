import { OnInit, Component, Input } from "@angular/core";

import { IsahitService } from "../../services/isahit.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { saveAs } from  'file-saver/FileSaver';
import swal from 'sweetalert';

@Component({
  selector: 'isahit-report',
  templateUrl: './isahit-report.component.html',
  styleUrls: ['./isahit-report.component.css'],
  providers: [DatePipe]
})

export class IsahitReportComponent implements OnInit {

  @Input() batch_id: string|number;

  public currentPage: number = 1;
  public currentGotoPage: number = 1;
  public totalCount: number = 0;
  public reports: Array<Object>;
  public reportsQuery: string = "";
  public paginationQuery: string = "";
  public isahitTask: any = [];

  public total: number = 0;

  public reportsDisplay:string = "";
  public csvMode:boolean = false;
  public daterange: any = {};
  public lastReportFromValue = null;
  public modelBatchId = null;

  public paginationResponse: any = {next: null, previous: null};
  public pageSize: number = 25;
  public pageQueryParams: string;

  public filterReportForm: FormGroup;

  public pickerLabel: string = 'Sélectionner les dates du filtre'

  public startDateFilter: string = "";
  public endDateFilter: string = "";
  public statusFilter: string = "";

  public adsIdFilter: string = "";
  public taskIdFilter: string = "";
  public batchIdFilter: string = "";

  public readonly pickerOptions: any = {
    locale: {
      cancelLabel: 'Réinitialiser',
      applyLabel: 'Appliquer'
    }
  }

  private readonly downloadMessages: any = {
    title: "Succès !",
    body: "Fichier télécharger",
    alertType: "success"
  }

  private readonly errorPageInput: any = {
    title: "Erreur !",
    to_high: "Vous avez entré un nombre de pages supérieur au nombre disponible.",
    to_low: "Vous avez entré un nombre de pages inférieur au nombre disponible.",
    null: "Vous devez entré un nombre de pages correcte.",
    alertType: "error"
  }

  private readonly dateFilterFormat: string = "YYYY-MM-DD[T]HH:mm:ss.SSSSSS"
  private readonly pickerLabelText: string = 'Sélectionner les dates du filtre'

  private readonly statusVal: any = {
    "0": "", // default value
    "1": "pending",
    "2": "done",
    "3": "failed"
  }

  public readonly taskCreationStatuses: { [key: string]: string } = {
    "failed": "badge-danger",
    "pending": "badge-warning",
    "created": "badge-info",
    "done": "badge-success"
  }

  public readonly filterProperties: Array<string> = [
    "batchIdFilter", "statusFilter", "adsIdFilter", "taskIdFilter"
  ]

  constructor(
    private isahitService: IsahitService,
    private datePipe: DatePipe,
    private daterangepickerOptions: DaterangepickerConfig,
  ) {
    this.buildForm();
    this.reports = [];
  }

  public ngOnInit(): void {
    if (this.batch_id) {
      this.batchIdFilter = String(this.batch_id);
    }
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

  public selectedDate(value: any): void {
    this.startDateFilter = value.start.format(this.dateFilterFormat);
    this.endDateFilter = value.end.format(this.dateFilterFormat);

    const formattedStart = value.start.format('MM/DD/YYYY')
    const formattedEnd = value.end.format('MM/DD/YYYY')
    this.pickerLabel = `${formattedStart} - ${formattedEnd}`
  }

  private onValueChanged(data: any): void {
    this.filterProperties.forEach((property: string) => this[property] = data[property])
  }

  private buildForm(): void {
    this.filterReportForm = new FormGroup({
      startDateFilter: new FormControl('', [Validators.minLength(1)]),
      statusFilter: new FormControl('', [Validators.minLength(1)]),
      adsIdFilter: new FormControl('', [Validators.minLength(1)]),
      taskIdFilter: new FormControl('', [Validators.minLength(1)]),
      batchIdFilter: new FormControl('', [Validators.minLength(1)]),
    });
    this.filterReportForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  private buildReportTable(): void {
    this.reports = [];

    this.isahitTask.results.forEach(item => {
     this.reports.push({
       id: item.id,
       ad_id: item.ad_id,
       batch_id: item.batch_id,
       isahit_task_id: (item.isahit_task_id ? item.isahit_task_id : "Inconnu"),
       task_creation: item.task_creation,
       task_creation_status: item.task_creation_status,
       task_status: item.task_status,
       task_status_update: (item.task_status_update ? item.task_status_update : "Inconnu" ),
       type_task: (item.type_task ? item.type_task : "Inconnu" )
     })
   })

    if (this.reports.length == 0)  {
      this.reportsDisplay = "Aucune donnée trouvée";
    }
    this.totalCount = Math.round(this.isahitTask.count / this.pageSize);
  }

  public loadTask(): any {
    if (this.csvMode) {
      return this.isahitService.getIsahitTaskCSV(this.pageQueryParams).subscribe(val => {
        this.saveBlob("text/csv", val, true);
      });
    } else {
      return this.isahitService.getIsahitTask(this.pageQueryParams).subscribe(val => {
        this.isahitTask = val;
        this.buildReportTable()
      });
    }
  }

  public resetFilter(): void {
    if (this.batch_id)
      this.batch_id = ''
    this.reportsQuery = "";
    this.paginationQuery = "";
    this.statusFilter = "0";
    this.adsIdFilter = '';
    this.batchIdFilter = '';
    this.endDateFilter = ''; 
    this.startDateFilter = '';
    this.taskIdFilter = '';
    this.buildForm();
    this.currentPage = 1;
    this.currentGotoPage = 1;
    this.reloadQueryParams();
    this.loadTask();

    this.pickerLabel = this.pickerLabelText
  }

  private saveBlob(type: "text/csv", value: any, isNotify: true) {
    let blob = new Blob ([value],{ type: 'text/csv' });
    saveAs(blob,'coinafrique_isahitTask.csv');
    this.isahitTask = value;
    swal(this.downloadMessages.title, this.downloadMessages.body, this.downloadMessages.alertType);
    this.csvMode = false;
  }

  private pageableArray(toPaginate: Array<any>, perPage: number, currentPage: number): any[] {
     return toPaginate.slice(this.pageSize * (currentPage - 1), perPage * currentPage);
  }

  private getFilterParams(): string {
    let query: string = '';
    query += this.getTaskStatus()

    if (this.adsIdFilter) {
      query += `&ad_id=${this.adsIdFilter}`
    }
    
    if (this.taskIdFilter) {
      query += `&isahit_task_id=${this.taskIdFilter}`
    }

    if (this.startDateFilter) {
      query += `&creation_start=${this.startDateFilter}`
    }

    if (this.endDateFilter) {
      query += `&creation_end=${this.endDateFilter}`
    }

    if (this.batchIdFilter) {
      query += `&batch_id=${this.batchIdFilter}`
    }

    return query;
  }

  private getTaskStatus(statusKey: string = 'task_status'): string {
    if (!this.statusFilter || this.statusFilter == '0') { return '' }

    return `&${statusKey}=${this.statusVal[this.statusFilter]}`
  }

  private reloadQueryParams(): void {
    this.pageQueryParams = '?'
    this.pageQueryParams += this.getPaginationParams()
    this.pageQueryParams += this.getFilterParams()
  }

  private getPaginationParams(): string {
    return `page_size=${this.pageSize}&page=${this.currentPage}`
  }

  public get totalPagesCount(): number {
    return Math.round(this.reports.length / this.pageSize)
  }

  public isNextPageAvailable(): boolean {
    // NOTE: local calculation works faster then response-based
    // return this.paginationResponse.next != null
    return (this.currentPage > 0) && (this.currentPage < this.totalCount)
  }

  public isPreviousPageAvailable(): boolean {
    // NOTE: local calculation works faster then response-based
    // return this.paginationResponse.previous != null
    return this.currentPage > 1
  }

  public getPreviousPage(): void {
    if (this.isPreviousPageAvailable()) {
      this.currentPage--
      this.currentGotoPage = this.currentPage
      // this.pageQueryParams = this.paginationResponse.previous
      this.reloadQueryParams()
      this.loadTask()
    }
  }

  public getSpecificPage(pageNumber: number): void {
    if ((this.currentGotoPage > 0) && (this.currentGotoPage <= this.totalCount)) { 
      this.currentPage = pageNumber;
      this.currentGotoPage = pageNumber;// this.pageQueryParams = this.paginationResponse.next
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
      // this.pageQueryParams = this.paginationResponse.next
      this.reloadQueryParams()
      this.loadTask()
    }
  }

  public clearDaterangeValues(event: Event): void {
    this.pickerLabel = this.pickerLabelText
    this.startDateFilter = '';
    this.endDateFilter = '';
  }

  public getTaskStatusClass(statusName: string): string {
    return this.taskCreationStatuses[statusName] || ''
  }
}
