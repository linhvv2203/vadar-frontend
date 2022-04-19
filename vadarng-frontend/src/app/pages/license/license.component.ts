import { Component, OnInit } from '@angular/core';
import { selectDetail } from 'src/app/redux/workspaces';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/redux/app.state';
import { Observable } from 'rxjs';
import { ExpireStatus } from 'src/app/enums/enums';

@Component({
  selector: 'vadar-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.less']
})
export class LicenseComponent implements OnInit {

  model$: Observable<object>;
  ExpireStatus = ExpireStatus;
  
  constructor(
    private _store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.model$ = this._store.pipe(select(selectDetail));
  }

}
