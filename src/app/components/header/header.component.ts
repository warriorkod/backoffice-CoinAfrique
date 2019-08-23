import { Component,OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pays } from '../../models/pays';
import { NewVendor } from '../../models/new_vendor';
import { Observable } from 'rxjs';
import * as fromRoot from '../../reducers';
import { ApisService } from '../../services/apis.service';
import { VendeursrfuService } from 'app/services';
import * as vendeurActions from '../../actions/vendeursrfu';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from 'app/containers/dashboard/dashboard.component';
declare const jQuery: any;


@Component({
  selector: 'bo-header',  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() button: string;
  @Input() test: number
  pays$: Observable<Pays[]>;
  localites$: any;
  localityByCountry$ = [];
  diagnostic : string;
  showCreateUserAccountModal$ = false;
  selectedCountry$: number;
  phone_code : string;
  pays_code : string;
  // new_vendor: NewVendor;
  new_vendor = {
    "name": "",
    "email": "",
    "password1": "",
    "password2": "",
    "country": "",
    "address": "",
    "phone": "",
    "whatsapp_phone":"",
    "longitude": null,
    "latitude": null,
    "source": null,
    "device_id": null,
    "gender": null,
    "birthday": null  
  };
  vendorForm: FormGroup;
  vendorFormErrors = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    country: ''
  };

  formErrors = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    country: '',
    toshort: ''
  };

  validationMessages = {
    name: {
      required: 'Le nom complet est obligatoire.'
    },
    email: {
      required: `L'email est obligatoire.`
    },
    password1: {
      required: `Le mot de passe est obligatoire.`,
      toshort: `Le mot de passe doit contenir au minimum 8 caractere.`

    },
    password2: {
      required: `La confirmation mot de passe est obligatoire.`
    },
    country: {
      required: `Le pays est obligatoire.`
    }
  };

  constructor(private formBuilder: FormBuilder, protected _http: HttpClient, private _store: Store<fromRoot.State>,  private apiService: ApisService, private vendeurService: VendeursrfuService) {
      this.pays$ = _store.select(fromRoot.getPays);
      this.apiService.getLocalities().subscribe(data => this.localites$ = data);

  }

  ngOnInit(): void{
    this.buildvendorForm();
    this.phone_code = "";
  }
  onCreateUserAccount(){
    this.showCreateUserAccountModal$ = true;
  }
  

  onChangePays(c){
    this.localityByCountry$ = [];
    this.pays$.subscribe(value => {
      for (let i=0; i<value.length; i++){
        if (value[i].id == c.country){
              this.phone_code = value[i].phone_code;
              this.pays_code = value[i].code;
        }
      }
    });
    for (let i=0; i<this.localites$.length; i++){
      if (this.localites$[i].pays == c.country){
            this.localityByCountry$.push(this.localites$[i]);
      }
    }
    console.log(this.localityByCountry$);
  }
  onCreateNewVwndor(vendor){
    let flag = false;
    if (vendor.name == '') {
      this.formErrors['name'] = this.validationMessages['name'].required;
      flag = true;
    }
    if (vendor.email == '') {
      this.formErrors['email'] = this.validationMessages['email'].required;
      flag = true;
    }
    if (vendor.password1 == '') {
      this.formErrors['password1'] = this.validationMessages['password1'].required;
      flag = true;
    }
    if (vendor.password2 == '') {
      this.formErrors['password2'] = this.validationMessages['password2'].required;
      flag = true;
    }
    if (vendor.country == '') {
      this.formErrors['country'] = this.validationMessages['country'].required;
      flag = true;
    }
    if (vendor.password1 !== vendor.password2){
      this.diagnostic = "les mots de passe ne correspondent pas";
      flag = true;
      
    }
    if (vendor.password1.length< 8 ){
      this.formErrors['toshort'] = this.validationMessages['password1'].toshort;
      flag = true;
      
    }
    if (flag) {
      return;
    }
    this.new_vendor = vendor;
    this.new_vendor.name = vendor.name;
    this.new_vendor.email = vendor.email;
    this.new_vendor.password1 = vendor.password1;
    this.new_vendor.password2 = vendor.password2;
    this.new_vendor.country = vendor.country;
    this.new_vendor.phone = vendor.phone;
    this.new_vendor.whatsapp_phone = vendor.whatsapp_phone;
    this.new_vendor.address = vendor.address;

    if (!this.new_vendor.phone.includes(this.phone_code)){
      if (this.new_vendor.phone.indexOf(this.phone_code)){
          this.new_vendor.phone = "";
      }else{
        this.new_vendor.phone = this.phone_code+""+this.new_vendor.phone; 
      }
    }
    if (!this.new_vendor.whatsapp_phone.includes(this.phone_code)){
        if (this.new_vendor.whatsapp_phone.indexOf( this.phone_code)){
          this.new_vendor.whatsapp_phone = "";
      }
      else{
        this.new_vendor.whatsapp_phone = this.phone_code+""+this.new_vendor.whatsapp_phone; 
      }
    }
    this.new_vendor.country = this.pays_code; 
    this._store.dispatch(
      new vendeurActions.RequestVendeurRfuCreate(this.new_vendor)
    );
    jQuery('#CreateVendorModal').modal('hide');
    this._store.dispatch(new vendeurActions.RequestVendeursRfu());


    // vendor.country = this.pays_code;
    // this._store.dispatch(
    //   new vendeurActions.RequestVendeurCreate(vendor)
    // );
    // console.log(vendor);
  }
  buildvendorForm() {
    this.vendorForm = new FormGroup({
      name: new FormControl(this.new_vendor.name, Validators.required),
      email: new FormControl(this.new_vendor.email, [Validators.required, Validators.email]),
      password1: new FormControl(this.new_vendor.password1, Validators.required),
      password2: new FormControl(this.new_vendor.password2, Validators.required),
      country: new FormControl(this.new_vendor.country, Validators.required),
      phone: new FormControl(''),
      whatsapp_phone: new FormControl(''),
      address: new FormControl('')
    });
    this.vendorForm.valueChanges.subscribe(data =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }


  onValueChanged(data?: any) {
    if (!this.vendorForm) {
      return;
    }
    const form = this.vendorForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        } 
      }
    }
  }

}
