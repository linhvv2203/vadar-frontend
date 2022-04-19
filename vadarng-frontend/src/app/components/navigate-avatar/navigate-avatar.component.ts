import { Component, OnInit } from "@angular/core";
import { OidcSecurityService } from "angular-auth-oidc-client";

import { AuthStorage } from "src/app/services/auth/auth-storage.service";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { IAppState } from "src/app/redux/app.state";
import { select as selectAuth } from "src/app/redux/auth";
import { TranslateService } from "@ngx-translate/core";
import { NzModalService, NzModalRef } from "ng-zorro-antd";

@Component({
  selector: "vadar-navigate-avatar",
  templateUrl: "./navigate-avatar.component.html",
  styleUrls: ["./navigate-avatar.component.less"]
})
export class NavigateAvatarComponent implements OnInit {
  auth$: Observable<object>;
  confirmModal: NzModalRef;
  profileUser: any;

  constructor(
    private _oidcSecurityService: OidcSecurityService,
    private _authStorage: AuthStorage,
    private _store: Store<IAppState>,
    private _translateService: TranslateService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.auth$ = this._store.pipe(select(selectAuth));
    this._store.pipe(select(selectAuth)).subscribe(auth => {
      this.profileUser = auth;
    });
  }

  logout() {
    this._authStorage.remove();
    this._oidcSecurityService.logoff();
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.translateText("MENU.LOGOUT"),
      nzContent: this.translateText("MENU.YOU_ARE_SURE_LOGOUT"),
      nzCancelText: this.translateText("MENU.NO"),
      nzOkText: this.translateText("MENU.YES"),
      nzOnOk: () => this.logout()
    });
  }

  translateText(content: string): string {
    let result = "";
    this._translateService.get(content).subscribe((res: string) => {
      result = res;
    });
    return result;
  }

  clickToProfile(url: string) {
    if (url) {
      location.href = location.origin + url + this.profileUser.id;
    }
  }
}
