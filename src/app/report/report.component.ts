import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbcallingService } from '../dbcalling.service';
import { QuotationModel } from '../Store/quotationModel';
import * as pageStore from 'src/app/Store/PageStore/Page.Actions';
import { Store } from '@ngrx/store';
import { LoginModel } from '../Store/loginModel';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{

  quotationModel: QuotationModel;
  loginModel: LoginModel;
  submitted = false;

  constructor(
    private dbCallingService: DbcallingService,
    private router: Router,
    private store: Store<any>
  ) {
    debugger;
    this.quotationModel = new QuotationModel();
    this.loginModel = new LoginModel();
  }

  ngOnInit(): void {
    debugger;
    try {
      debugger;
      var result1 = this.store.source['value']['QuotationStorage'].filter(
        (x) => {
          return x.viewName == 'Login';
        }
      );
      debugger;
      if (result1.length > 0) {
        this.loginModel = Object.assign({}, result1[0]);
        debugger;
        if (+this.loginModel.Id > 0) {
          
          this.router.navigateByUrl('report');
        }
      }
    } catch (e) {}
  }

  search() {
    debugger;
  }

  exportToExcel() {

  }

}
