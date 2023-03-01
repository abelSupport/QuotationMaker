import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DbcallingService } from '../dbcalling.service';
import { LoginModel } from '../Store/loginModel';

import * as pageStore from 'src/app/Store/PageStore/Page.Actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loginModel: LoginModel;

  constructor(
    private router: Router,
    private store: Store<any>,
  ) {
    this.loginModel = new LoginModel();
  }

  ngOnInit(): void {
    debugger;
    try {
      debugger;
      var result1 = this.store.source['value']['QuotationStorage'].filter((x) => {
        return x.viewName == 'Login';
      });
      debugger;
      if (result1.length > 0) {
        this.loginModel = Object.assign({}, result1[0]);
        debugger;
        if (+this.loginModel.Id > 0) {
          if (this.loginModel.User_Name != '') {
            this.router.navigateByUrl('dashboard');
          }
        }

        else {
          this.router.navigateByUrl('login');
        }
      }
    } catch (e) {}
    
  }

}
