import { OnInit, Component } from "@angular/core";

import { IsahitParameter } from '../../models/isahit';
import { IsahitService } from "../../services/isahit.service";
import { Store } from '@ngrx/store'
import * as  modalActions from "app/actions/modal"

@Component({
  selector: 'isahit-parameters',
  templateUrl: './isahit-parameters.component.html',
  styleUrls: ['./isahit-parameters.component.css']
})

export class IsahitParametersComponent implements OnInit {
  public parameters: Array<IsahitParameter> = [];
  public selectedParam: IsahitParameter;
  public editedIndex: number;
  public error: string;
  public readonly formLabelsFr = {
    'parameterEdit': 'Modification de paramètre',
    'edit': 'Modifier',
    'key': 'Clé',
    'value': 'Valeur',
    'description': 'Description',
    'submit': 'Soumettre',
    'cancel': 'Annuler'
  }

  constructor(
    public _store: Store<any>,
    private isahitService: IsahitService,
  ) {}

  public ngOnInit(): void {
    this.loadData()
  }

  private loadData(): void {
    this.isahitService.getIsahitParameters()
      .subscribe(
        (response: any) => {
          this.parameters = response;
        },
        (err: any) => {
          console.error(err)
        }
      )
  }

  public showEditModal(param: IsahitParameter, idx: number): void {
    this.selectedParam = param;
    this.editedIndex = idx;
  }

  public resetSelectedParam(event: Event): void {
    this.selectedParam = null;
    this.error = null;
  }

  public updateParam(values): void {
    this.isahitService.putIsahitParameter(this.selectedParam.id, values)
      .subscribe(
        (response: any) => {
          this.parameters[this.editedIndex] = response;
          this._store.dispatch(new modalActions.hideModal({id: 'modal-isahit-param'}))
          this.selectedParam = null;
        },
        (err: any) => {
          this.error = err.message;
        }
      )
  }
}
