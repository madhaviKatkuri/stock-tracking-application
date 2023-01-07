import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { CompanyNames } from '../model/companydata';
import { Quote } from '../model/quote';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {
  finnhubApiUrl: string = 'https://finnhub.io/api/v1/';
  tokenKeyValue: string = 'bu4f8kn48v6uehqi3cqg';

  constructor(private http: HttpClient) { }//uses rx based functions and opertors 
  companyNamesApi: string;
  QuoteInformationApi: string;


  getCompanyNames(symbol: string): Observable<CompanyNames> {
    this.companyNamesApi = `${this.finnhubApiUrl}search?q=${symbol}&token=${this.tokenKeyValue}`;
    return this.http.get<CompanyNames>(
      this.companyNamesApi
    )
  }

  getQuoteInformation(symbol: string): Observable<Quote> {
    this.QuoteInformationApi = `${this.finnhubApiUrl}quote?symbol=${symbol}&token=${this.tokenKeyValue}`;
    return this.http.get<Quote>(
      this.QuoteInformationApi
    );
  }



}
