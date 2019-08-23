import { OnInit, Component } from "@angular/core";
import { IsahitToken } from '../../models/isahit';
import { IsahitService } from "../../services/isahit.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'isahit-addbatch',
  templateUrl: './isahit-addbatch.component.html',
  styleUrls: ['./isahit-addbatch.component.css']
})

export class IsahitAddBatchComponent implements OnInit {
  public currentPage: number = 1;
  public totalCount: number = 0;
  public tokens: Array<IsahitToken> = [];

  public selectBatchForm: FormGroup;

  public paginationResponse: any = {next: null, previous: null};
  public pageSize: number = 25;
  public pageQueryParams: string;

  constructor(
    private router: Router,
    private isahitService: IsahitService
  ) {
    this.buildForm();
  }

  public ngOnInit(): void {

  }

  public submitForm(value) {
    this.addBatch(value);
  }

  private readonly messages: any = {
    batchCreated: "Le batch a été créé",
    redirection: "Redirection"
  }

  private buildForm(): void {
    this.selectBatchForm = new FormGroup({
      ad_id_lower_range: new FormControl('', [Validators.minLength(1), Validators.required]),
      ad_id_upper_range: new FormControl('', [Validators.minLength(1), Validators.required])
    });
    this.selectBatchForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this.onValueChanged();
  }

  private onValueChanged(data: any) {
  }

  addBatch(data) {
    var newBatch: any = {
      ad_id_lower_range: "",
      ad_id_upper_range: ""
    }

    if (data) {
      newBatch.ad_id_lower_range = data.ad_id_lower_range;
      newBatch.ad_id_upper_range = data.ad_id_upper_range;
      this.isahitService.postBatch(newBatch).subscribe(data => {
        if ((data as any).batch_id) {
          swal("Succès", `${this.messages.batchCreated}... ${this.messages.redirection}...`, "success");
          this.router.navigate(['/isahit'], { queryParams: { batch_id: (data as any).batch_id }});
        } else {
          console.log(data);
        }
      },
      error => {
        swal("Erreur", "Erreur dans la création du batch, vérifiez les ids", "error");
      });
    }
  }

}
