import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as sesionsActions from '../../actions/session';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { LockService } from '../../services';
import { INavStateService, SidebarStateService, NAV_STATES } from '../../services/navbar.service';

@Component({
  selector: 'bo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public user_name: string = 'CoinAfrique';
  public user_mail: string = 'mail@coinafrique.com';
  public user_role: string = localStorage.getItem('bo::role');


  private navStateService: INavStateService;

  private navbarState: number = NAV_STATES.default
  @Output() onNavbarStateChange = new EventEmitter<number>();

  constructor(private _store: Store<fromRoot.State>, private lockService: LockService) {
    this.navStateService = new SidebarStateService(NAV_STATES)
  }

  ngOnInit() {
    const user: object = JSON.parse(localStorage.getItem('bo::user'));
    // tslint:disable-next-line:no-unused-expression
    this.user_name = this.generateUsername(user)
    this.user_mail = user['username'] + '@coinafrique.com';
  }

  public logout(): void {
    this._store.dispatch(new sesionsActions.RequestDestroyOauthAction({}));
    const user: object = JSON.parse(localStorage.getItem('bo::user'));
    const user_id = user['sub'];
    this.lockService.deleteUserLock(user_id);
  }

  public switchSidebarState(): void {
    this.navbarState = this.navStateService.next(this.navbarState)
    this.onNavbarStateChange.emit(this.navbarState);
  }

  private generateUsername(userData: any): string {
    if (userData['firstname']) {
      return userData['firstname'] + ' ' + userData['lastname']
    } else {
      return userData['username'];
    }
  }
}
