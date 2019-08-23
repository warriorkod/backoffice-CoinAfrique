import {
  Component,
  OnInit,
} from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { Store } from "@ngrx/store";
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { IsahitTask } from '../../models/isahit';
import * as fromRoot from "../../reducers";

import { LockService,  IsahitService } from '../../services';
import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
  selector: "bo-isahit-page",
  templateUrl: "./isahit-page.component.html",
  styleUrls: ["./isahit-page.component.css"],
  providers: [DatePipe],
})

export class IsahitPageComponent implements OnInit{
  titre$ = "Isahit"
  isahitTokenList: any;
  currentTab = 4;

  addTokenForm: FormGroup;
  filterReportForm: FormGroup;
  searchQueueForm: FormGroup;
  selectActionQueueForm: FormGroup;
  filterModerationForm: FormGroup;

  isahitTask: any;
  isahitQueue: any;

  queue: Array<Object>;
  reportsQuery = "";
  reportsDisplay = "";
  addTokenDisplay = "";
  searchQueueDisplay = "";

  paginationQuery = "";
  defaultReportPageSize = 25;
  page: number = 1;
  total: number = 0;
  prev = false;
  currentPage = 1;
  csvMode = false;
  public daterange: any = {};
  daterangepicker: Date;
  public options: any = {
        locale: { format: 'YYYY-MM-DD' },
        alwaysShowCalendars: false,
    };

  lastReportFromValue = null
  public batch_id: number = 0;
  public batchId = null;
  public pageSize: number = 25;

  public currentPendingPage = 1;
  public totalPending: number = 0;
  public pendingTasks: Array<IsahitTask> = [];
  public pendingPagination: {next: string; previous: string};
  public _pendingTasksFilterQuery: string = '&task_status=pending';

  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = this.datePipe.transform(value.start, "shortDate") + " - " + this.datePipe.transform(value.end, "shortDate");
  }

  copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    swal("Texte copier", "Le token se trouve désormais dans votre presse-papier", "success");
  }

  ngOnInit() {

  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private daterangepickerOptions: DaterangepickerConfig,
    private _store: Store<fromRoot.State>,
    private _isahitService: IsahitService,
    private lockService: LockService
  ) {
      this.isahitTokenList = [];
      this.isahitTask = [];
      this.addTokenDisplay = String("");
      this.daterange.label = "";
      this.daterangepickerOptions.settings = {
          locale: { format: 'DD-MM-YYYY' },
          alwaysShowCalendars: false,
          autoUpdateInput: false,
      };
      this.queryReportPagination();
      this.activatedRoute.queryParams.subscribe((params: Params) => {
          if (params.batch_id)  {
            this.currentTab = 3;
            this.batch_id = params.batch_id;
          }
      });
    }

  private queryReportPagination(): void {
    this.paginationQuery = "?page_size=" + this.pageSize;
    this.paginationQuery = this.paginationQuery + "&page=" + String(this.currentPage);
  }

  getPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
      this.page = this.currentPage;

      if (this.currentPage > 0) {
        this.prev = true;
      } else
        this.prev = false;
      }
  }

  switchToTab(tab: number): void {
    this.currentTab = tab;
  }

  validateToken(newToken, token) {
    swal("Erreur", "Le format du token n'est pas compatible", "error");
    return false;
  }

  public addToken(data): void {
    let jwtDecode = require('jwt-decode');
    var newToken: any = {
      token: "",
      exp:"",
      iss:""
    }
    var jwttoken;

    if (data)  {
      if (data.token.length <= 0) {
        swal("Erreur",  "Le token ne peut pas être vide", "error");
      } else {
          jwttoken = jwtDecode(data.token);
          newToken.token = data.token;
          newToken.exp = jwttoken.exp ? jwttoken.exp : "null";
          newToken.iss = jwttoken.iss ? jwttoken.iss : "bo-services.coinafrique.com";
          this._isahitService.postToken(newToken).subscribe(data => {
            // API post callback
            swal("Succès", "Le token a été ajouter", "success");
          });
        }
    }
  }
}
