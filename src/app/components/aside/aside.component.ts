import { Component, OnInit, Input } from '@angular/core';
import * as sessionActions from '../../actions/session';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { NAV_STATES } from "../../services/navbar.service";

@Component({
  selector: 'bo-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./styles/aside.component.css', './styles/overrides.component.css']
})

export class AsideComponent implements OnInit {
  public user_name: string = 'CoinAfrique';
  public user_mail: string = 'mail@coinafrique.com';
  public role: string = localStorage.getItem('bo::role');

  public sectionCollapseStates: { [key: number]: boolean } = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  }

  @Input() sidebarState: number = NAV_STATES.default;

  constructor(private _store: Store<fromRoot.State>) { }

  ngOnInit() {
    const user: object = JSON.parse(localStorage.getItem('bo::user'));
    this.user_name = user['username'];
    this.user_mail = user['username'] + '@coinafrique.com';
    this.role = localStorage.getItem('bo::role');
  }

  public getSidebarId(): string {
    if (!this.sidebarState || this.sidebarState === NAV_STATES.default) {
      return 'fixed-sidebar'
    } else if (this.sidebarState === NAV_STATES.half) {
      return 'half-sidebar'
    } else {
      return 'hidden-sidebar'
    }
  }

  public isHalfSidebar(): boolean {
    return this.sidebarState === NAV_STATES.half
  }

  public switchSectionState(section: number): void {
    this.sectionCollapseStates[section] = !this.sectionCollapseStates[section]
  }

  public logout(): void {
    this._store.dispatch(new sessionActions.RequestDestroyOauthAction({}));
  }

  public isAdmin(): boolean {
    return this.role === 'admin';
  }

  public isModerator(): boolean {
    return this.role === 'moderator';
  }

  public isFreelancer(): boolean {
    return this.role === 'freelancer';
  }
}
