import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError, timeout } from 'rxjs/operators';
import { QuotationModel } from './Store/quotationModel';

@Injectable({
  providedIn: 'root',
})
export class DbcallingService {
  apiURL = environment.baseUrl;
  quotationModel: QuotationModel;

  constructor(private httpClient: HttpClient) {}

  getData() {
    debugger;
    return this.httpClient
      .post<any>(this.apiURL + '/data/getData', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log('Client side Error ', errorResponce.error.message);
    } else {
      console.log('Server side Error ', errorResponce);
    }
    return throwError('something went wrong');
  }

  login(loginModel) {
    debugger;
    var dataPass = JSON.stringify(loginModel);
    return this.httpClient
      .post<any>(this.apiURL + '/login/getLoginUser', dataPass, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  saveQuotation(quotationModel: any): Observable<QuotationModel> {
    debugger;
    var dataPass = JSON.stringify(quotationModel);
    return this.httpClient.post<QuotationModel>(this.apiURL +'/data/saveQuotation', dataPass,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }


  saveBoq(boqModel) {
    debugger;
    var dataPass = JSON.stringify(boqModel);
    return this.httpClient.post<QuotationModel>(this.apiURL +'/data/addBOQData', dataPass,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  viewBoq(boqModel) {
    debugger;
    var dataPass = JSON.stringify(boqModel);
    return this.httpClient.post<QuotationModel>(this.apiURL +'/data/viewBoq', dataPass,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  verify(quotationModel) {
    debugger;
    var dataPass = JSON.stringify(quotationModel);
    return this.httpClient.post<QuotationModel>(this.apiURL +'/data/verify', dataPass,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  buildTableBody(data, columns) {
    var body = [];
    var dataRow = [];
    columns.forEach((column) => {
      dataRow.push({ text: column, bold: 'true', alignment: 'center' });
    })
    body.push(dataRow);

    // body.push(columns);
    data.forEach((row) => {
      var dataRow = [];
      columns.forEach((column) => {
        dataRow.push(String(row[column]));
      })
      body.push(dataRow);
    });
    console.log(body)
    return body;
  }

  updateProfile(loginModel) {
    debugger;
    var dataPass = JSON.stringify(loginModel);
    return this.httpClient.post<QuotationModel>(this.apiURL +'/login/updateProfile', dataPass,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

}
