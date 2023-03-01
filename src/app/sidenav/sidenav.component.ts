import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModel } from '../Store/loginModel';
import * as pageStore from 'src/app/Store/PageStore/Page.Actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  opened = true;
  loginModel: LoginModel;;

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

  home() {
    this.router.navigateByUrl('dashboard');
  }

  editProfile() { 
    this.router.navigateByUrl('/profile');
  }

  logout() {
    debugger;
    this.loginModel = new LoginModel();
    this.store.dispatch(
      new pageStore.OpenPage(Object.assign({}, this.loginModel))
    );
    this.router.navigateByUrl('login');
  }

}
