import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbcallingService } from '../dbcalling.service';
import { LoginModel } from '../Store/loginModel';

import * as pageStore from 'src/app/Store/PageStore/Page.Actions';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;
  submitted = false;
  loginModel: LoginModel;

  result: any = [];

  constructor(
    private router: Router, 
    private dbCallingService: DbcallingService,
    private store: Store<any>,
    private fb: FormBuilder
    ) { 
    debugger;
    this.loginModel = new LoginModel();
  }

  ngOnInit() {
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
      }
    } catch (e) {}
  }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    debugger;
    if (!this.loginForm.valid) {
      if (this.loginModel.User_Name != '' && this.loginModel.User_Pass != '') {
        debugger;
        this.dbCallingService.login(this.loginModel).subscribe((res) => {
          debugger;
          this.result = res;
          if (this.result.data.length > 0) {
            this.loginModel = this.result.data[0];
            this.loginModel.viewName = 'Login';
            this.store.dispatch(new pageStore.OpenPage(Object.assign({}, this.loginModel)));
  
            this.router.navigateByUrl('dashboard');
          } 
          else {
            Swal.fire({
              text: 'Invalid UserName Or Password !',
              icon: 'warning'
            });
          }
        });
      }
      else {
        Swal.fire({
          text: 'UserName Or Password cannot be Empty !',
          icon: 'warning'
        });
      }
    }
    console.log(this.loginForm.value);
  }

}