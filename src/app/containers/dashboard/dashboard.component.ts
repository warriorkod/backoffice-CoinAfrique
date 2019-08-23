import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs';
import * as dashboardActions from '../../actions/dashboard';

interface ICountryInfo {
  name: string;
  code: string;
}

export const Country: Array<ICountryInfo>  =
[
    {"name": "Burkina Faso", "code" :"BF"},
    {"name": "Benin", "code" :"BJ"},
    {"name": "RDC", "code" :"CD"},
    {"name": "Congo", "code" :"CG"},
    {"name": "Côte d'Ivoire", "code" :"CI"},
    {"name": "Cameroun", "code" :"CM"},
    {"name": "Gabon", "code" :"GA"},
    {"name": "Guinea", "code" :"GN"},
    {"name": "Madagascar", "code" :"MG"},
    {"name": "Mali", "code" :"ML"},
    {"name": "Niger", "code" :"NE"},
    {"name": "Sénégal", "code" :"SN"},
    {"name": "Maurice", "code" : "MU"},
    {"name": "Togo", "code" :"TG"},
    {"name": "Tchad", "code" : "RO"},
    {"name": "Rwanda", "code" : "RW"},
    {"name": "Gabon", "code" : "GA"},
    {"name": "Seychelles", "code" : "SC"},
    {"name": "Rép centrafricaine", "code": "CF"},
    {"name": "Comores", "code":"ERR"},
    {"name": "Congo", "code":"CG"},
    {"name": "Togo", "code":"TG"},
    {"name": "Mauritanie", "code":"MR"},
    {"name": "Madagascar", "code":"MG"},
    {"name": "Mali", "code":"ML"},
    {"name": "Guinee", "code":"GN"}
]

@Component({
  selector: 'bo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  titre$: string;
  data: {};
  keywords$: Observable<Array<any>>;
  dashboard_data$: Observable<Object>;
  vendeur_acheteurs: any[];
  top_five: any[];
  top_five_users: any[];
  view: any[] = ['100%', '100%'];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Pays';
  showYAxisLabel = true;
  yAxisLabel = 'Annonces';
  yAxisLabel2 = 'Utilisateurs';


  id = 'chart1';
  width = '100%';
  height = 400;
  type = 'mscombi2d';
  dataFormat = 'json';
  dataSource;

  role = localStorage.getItem('bo::role');

  constructor(private http: HttpClient, private _store: Store<fromRoot.State>, ) {
    this.titre$ = 'Dashboard';
    // this.keywords$ = _store.select(fromRoot.getKeywords);
    this.dashboard_data$ = _store.select(fromRoot.getData);

    this.dashboard_data$.subscribe(val => {
      if (Object.keys(val).length !== 0) {
        this.data = val;
        this.vendeur_acheteurs = this.data['vendeurs_achteur_graphe'];
        this.top_five = this.data['top_five_pays'];
        this.top_five_users = this.data['top_five_pays_users'];
        this.dataSource = {
          'chart': {
            'caption': 'Répartition Annonces/Vendeurs/Acheteurs par Pays',
            'theme': 'zune'
          },
          'categories': [
            {
              'category': this.data['stat_pays_top']['pays']
            }
          ],
          'dataset': [
            {
              'seriesname': 'Nombre d\'annonce',
              'data': this.data['stat_pays_top']['annonce']
            },
            {
              'seriesname': 'Nombre de vendeur',
              'renderas': 'line',
              'showvalues': '0',
              'data': this.data['stat_pays_top']['seller']
            }
          ]
        };
      }
    });
  }


  ngOnInit() {
    // if(this.isFreelancer()){
    //   this._store.dispatch(go(['/freelancers']));
    // }
    this._store.dispatch(new dashboardActions.RequestChartData());
  }

  isFreelancer() {
    return this.role === 'freelancer';
  }

  public formatSyntax(pays: string) : string {    
    for(let i = 0; i < Country.length; i++) {
      var elem = Country[i];
      if (elem.name == pays)
        return elem.code;
    }
    return "ERR";
  }
}
