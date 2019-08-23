import { OnInit, Component } from "@angular/core";

import { IsahitToken } from '../../models/isahit';
import { IsahitService } from "../../services/isahit.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import swal from 'sweetalert';

@Component({
  selector: 'isahit-token',
  templateUrl: './isahit-token.component.html',
  styleUrls: ['./isahit-token.component.css']
})

export class IsahitTokenComponent implements OnInit {
  public currentPage: number = 1;
  public totalCount: number = 0;
  public tokens: Array<IsahitToken> = [];

  public paginationResponse: any = {next: null, previous: null};
  public pageSize: number = 25;
  public pageQueryParams: string;

  public addTokenForm: FormGroup;

  constructor(
    private isahitService: IsahitService
  ) {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.buildForm()
    this.reloadQueryParams()
    this.loadData()
  }

  public submitForm(value) {
    this.addToken(value);
    this.reloadQueryParams()
    this.loadData()
  }

  private buildForm(): void {
    this.addTokenForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
    });
    this.addTokenForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  private onValueChanged(data: any) {
  }

  private loadData(): void {
    this.isahitService.getIsahitToken()
      .subscribe(
        (response: any) => {
          this.tokens = response
          this.totalCount = Math.ceil(response.length / this.pageSize);
          this.tokens = this.paginableArray(this.tokens, this.pageSize, this.currentPage)
        },
        (err: any) => {
          console.error(err)
        }
      )
  }

  private paginableArray(toPaginate: Array<any>, perPage: number, currentPage: number): any[] {
     return toPaginate.slice(this.pageSize * (currentPage - 1), perPage * currentPage);
  }

  private reloadQueryParams(): void {
    this.pageQueryParams = '?'
    this.pageQueryParams += this.getPaginationParams()
  }

  private getPaginationParams(): string {
    return `page_size=${this.pageSize}&page=${this.currentPage}`
  }

  public get totalPagesCount(): number {
    return Math.round(this.totalCount / this.pageSize) + 1
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
          this.isahitService.postToken(newToken).subscribe(data => {
            // API post callback
            swal("Succès", "Le token a été ajouter", "success");
          });
        }
    }
  }
}
