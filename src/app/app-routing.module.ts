import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { ReportComponent } from './report/report.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path: '', component: SidenavComponent,
  
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'quotationlist', component: QuotationListComponent },
    { path: 'report', component: ReportComponent },
  ],
},
{ path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
