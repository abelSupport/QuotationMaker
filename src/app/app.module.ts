import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { StoreModule } from '@ngrx/store';
import { Pagereducer } from './Store/PageStore/Page.Reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { ReportComponent } from './report/report.component';


export function localStorageSyncReducer(rootReducer: any) {
  return localStorageSync({
    keys: [
      {
        QuotationStorage: {
          encrypt: (state) => btoa(state),
          decrypt: (state) => atob(state),
        },
      },
    ],
    rehydrate: true,
  })(rootReducer);
}


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    LoginComponent,
    QuotationListComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,  
    MatDatepickerModule,  

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      { QuotationStorage: Pagereducer },
      { metaReducers: [localStorageSyncReducer],}
    ),

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
