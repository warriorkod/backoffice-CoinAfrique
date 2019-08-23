import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IsahitParameter } from '../../models/isahit';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'isahit-parameter-modal',
  templateUrl: './isahit-parameter-modal.component.html',
  styleUrls: ['./isahit-parameter-modal.component.css']
})

export class IsahitParameterModalComponent implements OnInit {
  @Input() param: IsahitParameter;
  @Input() error = {};
  @Input() formLabelsFr = {};
  @Output() public onFormSubmit = new EventEmitter();
  @Output() public resetSelectedParam: EventEmitter<boolean> = new EventEmitter()
  public paramForm: FormGroup;

  public ngOnInit(): void {
    this.buildForm();
  }

  resetParam() {
    this.resetSelectedParam.emit(true)
  }

  buildForm(): void {
    this.paramForm = new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.assignFormValues();
  }

  assignFormValues() {
    this.paramForm.patchValue({
      key: this.param.key,
      value: this.param.value,
      description: this.param.description
    })
  }

  submitForm(value) {
    this.onFormSubmit.emit(value);
  }
}
