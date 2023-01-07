import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SentimentInfo } from '../model/sentimentdata';
@Injectable({
  providedIn: 'root'
})
export class SentimentService {
  finnhubApiUrl: string = 'https://finnhub.io/api/v1/';
  tokenKeyValue: string = 'bu4f8kn48v6uehqi3cqg';
  sentimentDataApi: string;

  constructor(private http: HttpClient) { }

  getSentimentData(symbol: string, from: string): Observable<SentimentInfo> {
    this.sentimentDataApi = `${this.finnhubApiUrl}stock/insider-sentiment?symbol=${symbol}&from=${from}&to=2022-12-01&token=${this.tokenKeyValue}`;
    return this.http.get<SentimentInfo>(
      this.sentimentDataApi
    );
  }
}
