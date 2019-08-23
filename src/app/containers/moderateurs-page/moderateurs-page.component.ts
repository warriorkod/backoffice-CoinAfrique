
import {finalize} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable,  Subject } from "rxjs";
import { Moderateur } from "app/models/moderateur";
import { Store } from "@ngrx/store";
import { FormGroup } from "@angular/forms";
import * as fromRoot from "../../reducers";
import * as moderateurActions from "../../actions/moderateurs";
import * as customType from "../../models/constants";
import { ApisService } from "../../services/apis.service";
import { ModerateurService } from "../../services/moderateur.service";
import * as Papa from "papaparse";


@Component({
  selector: "bo-moderateurs-page",
  templateUrl: "./moderateurs-page.component.html",
  styleUrls: ["./moderateurs-page.component.css"]
})
export class ModerateursPageComponent implements OnInit, OnDestroy {
  status$: Observable<any>;
  moderateurs$: Observable<Moderateur[]>;
  moderateur$: Observable<Moderateur>;
  errors$: Observable<Object>;
  subscription: any;
  subscription2: any;
  moderateurs: Moderateur[];
  searchForm: FormGroup;
  addForm: FormGroup;
  titre = "Moderateurs";
  erreur = {};
  listErreurs = [];
  listSuccess = [];
  stats: {
    total: number;
    errorCount: number;
    successCount: number;
  };
  customType = customType;
  loading = true;
  currentUserId = JSON.parse(localStorage.getItem("bo::user"))["sub"];
  errModal: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showDesactivated: boolean;
  isAdmin$ = false;
  current_page = 1;
  total_page = 0;
  per_page = 30;
  page = 0;
  next = true;
  prev = true;
  isLoaded: boolean = false;

  constructor(
    private _store: Store<fromRoot.State>,
    private _apiService: ApisService,
    private _moderatorService: ModerateurService
  ) {
    this.errModal = "";
    this._apiService = _apiService;
    this._moderatorService = _moderatorService;
    this.listErreurs = [];
    this.listSuccess = [];
    this.stats = {
      total: 0,
      errorCount: 0,
      successCount: 0
    };
    this.status$ = _store.select(fromRoot.getModerateurStatus);
    this.moderateurs$ = _store.select(fromRoot.getModerateurs);
    this.moderateur$ = _store.select(fromRoot.getModerateur);
    this.errors$ = _store.select(fromRoot.getModerateurError);
    this.errors$.subscribe(val => {
      if (val && val["_body"]) {
        console.log(JSON.parse(val["_body"]));
        this.erreur = JSON.parse(val["_body"]);
      }
    });
    if (JSON.parse(localStorage.getItem("bo::user"))["role"] === "admin") {
      this.isAdmin$ = true;
    }
    this.showDesactivated = false;
    this.status$.subscribe(val => this.isLoaded = !val)
  }

  ngOnInit() {
    this._store.dispatch(new moderateurActions.RequestModerateurs());
    this.dtOptions = {
      pagingType: "full_numbers",
      retrieve: true,
      paging: false,
      info: false
    };

    this.subscription = this.moderateurs$.subscribe(moderateurs => {
      this.moderateurs = moderateurs;
      console.log(this.moderateurs);
      this.dtTrigger.next();
    });

    this.page = null;
    this.countTotalPage();
  }

  getNextPage() {
    if (this.current_page < this.total_page) {
      this.current_page += 1;
      this.getModerateursOnPageN(this.current_page);
    }
    this.fetchButtonPrevAndNext();
  }

  getPrevPage() {
    if (this.current_page > 1) {
      this.current_page -= 1;
      this.getModerateursOnPageN(this.current_page);
    }
    this.fetchButtonPrevAndNext();
  }

  fetchButtonPrevAndNext() {
    this.next = (this.current_page < this.total_page ) ? true : false;
    this.prev = (this.current_page > 1 ) ? true : false;
  }

  goToPage() {
    if (typeof this.page === "string") {
      this.page = parseInt(this.page);
    }
    if (
      Number.isInteger(this.page) &&
      this.page >= 1 &&
      this.page <= this.total_page
    ) {
      this.current_page = this.page;
      this.getModerateursOnPageN(this.current_page);
      this.fetchButtonPrevAndNext();
    }
    this.page = null;
  }

  getModerateursOnPageN(page_number) {
    this.subscription = this._moderatorService
      .getModerateursOnPageN(page_number)
      .subscribe((val: any) => {
        if (val) {
          this.moderateurs = val.data.items;
        }
      });
  }

  countTotalPage() {
    this.subscription2 = this._moderatorService
      .getModerateursOnPageN(this.current_page)
      .subscribe((val: any) => {
        if (val) {
          this.total_page = val.data.total / this.per_page;
          if (
            Number(this.total_page) === this.total_page &&
            this.total_page % 1 !== 0
          ) {
            this.total_page += 1;
          }
          this.total_page = Math.trunc(this.total_page);
          this.fetchButtonPrevAndNext();
        }
      });
  }

  onFormSubmit(value) {
    if (value.user_id) {
      console.log(value);
      this._store.dispatch(
        new moderateurActions.RequestUpdateModerateur(value)
      );
    } else {
      this._store.dispatch(
        new moderateurActions.RequestCreateModerateur(value)
      );
    }
  }

  editer(user) {
    this._store.dispatch(new moderateurActions.RequestModerateur(user));
  }

  delete(user) {
    this._store.dispatch(new moderateurActions.RequestDeleteModerateur(user));
  }

  addNewUser() {
    this._store.dispatch(new moderateurActions.RequestResetModerateur());
    this._store.dispatch(new moderateurActions.RequestNewModerateur());
  }

  desactivate(user) {
    let value = Object.assign({}, user);
    value.is_active = false;
    this._store.dispatch(new moderateurActions.RequestUpdateModerateur(value));
  }
  showAll() {
    this.showDesactivated = !this.showDesactivated;
  }

  changeListener(files: FileList) {
    this.loading = true;
    this.errModal = "";
    this.listSuccess = [];
    this.listErreurs = [];
    this.stats = {
      total: 0,
      errorCount: 0,
      successCount: 0
    };
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      if (file.type !== "text/csv") {
        return (this.errModal = "Ce type de fichier n'est pas pris en compte!");
      }
      reader.readAsText(file);
      reader.onload = e => {
        let csv = reader.result;
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: results => {
            let users = results.data;
            // Faire le check du json
            if (
              !users[0].hasOwnProperty("firstname") ||
              !users[0].hasOwnProperty("lastname") ||
              !users[0].hasOwnProperty("username") ||
              !users[0].hasOwnProperty("country") ||
              !users[0].hasOwnProperty("role")
            ) {
              this.loading = false;
              this.errModal = "Format fichier invalide";
              return;
            }
            let errRole = this.checkRole(users);
            if (errRole) {
              this.loading = false;
              this.errModal = "Erreur ROLE: " + JSON.stringify(errRole);
              return;
            }
            // verifier le pays
            this._apiService.getPays().subscribe((val: Array<any>) => {
              let ccTab = [];
              val.map(country =>
                country.code !== "" ? ccTab.push(country.code) : ""
              );
              let errCountry = users.find(
                element => !ccTab.includes(element.country.toUpperCase())
              );
              if (errCountry) {
                this.loading = false;
                this.errModal = "Erreur PAYS: " + JSON.stringify(errCountry);
                return;
              }
              this.errModal = "";
              // add users to DB
              users.forEach(user => {
                user.password = "passer";
                this._moderatorService
                  .createModerateur(user).pipe(
                  finalize(() => {
                    this.stats.total = users.length;
                    this.stats.errorCount = this.listErreurs.length;
                    this.stats.successCount = this.listSuccess.length;
                  }))
                  .subscribe(
                    data => {
                      let userAdded = data.data;
                      this.listSuccess.push(userAdded);
                    },
                    error => {
                      let message;
                      if (error && error.status === 303) {
                        message = `Le username "${user.username}" existe déjà`;
                        this.listErreurs.push(message);
                      } else if (error && error.status === 400) {
                        message = "Le mot de passe est requis";
                        this.listErreurs.push(message);
                      }
                    }
                  );
              });
            });
          }
        });
      };
    }
  }

  // check role must return undefined
  checkRole(users) {
    return users.find(
      element =>
        !["moderator", "freelancer", "admin"].includes(
          element.role && element.role.toLowerCase()
        )
    );
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
