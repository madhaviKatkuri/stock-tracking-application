import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators'
import { CompanyNames } from 'src/app/model/companydata';
import { Quote } from 'src/app/model/quote';
import { StockInfo } from 'src/app/model/stock';
import { Stock } from 'src/app/model/stock';
import { StockInformation } from 'src/app/model/stock';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  stockTrackingForm: FormGroup;
  stockDataList: StockInformation[] = [];
  stockList: Stock[] = [];
  quoteData = [];
  companyNames: CompanyNames;
  quotes: Quote;
  subData$: Subscription = new Subscription();
  loading: boolean = false;

  constructor(private readonly stockTrackerService: StockTrackerService) { }

  ngOnInit(): void {
    this.creatingStockForm();
    this.getStocks();
  }
  ngOnDestroy(): void {
    this.subData$.unsubscribe();
  }


  creatingStockForm(): void {
    this.stockTrackingForm = new FormGroup({
      symbol: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
    });
  }
  getStocks(): void {
    const stocks = localStorage.getItem('stockDataList');
    this.stockList = stocks ? JSON.parse(stocks) : [];
    this.stockDataList = this.stockList;
  }
  stockFormSubmit(): void {
    this.getCompanyNames();
  }
  getCompanyNames(): void {
    this.loading = true;
    const { symbol } = this.stockTrackingForm.value;

    this.sub(symbol);
  }
  private sub(symbol: string): void {
    this.subData$.add(
      combineLatest({
        companyNames: this.stockTrackerService.getCompanyNames(symbol),
        quotes: this.stockTrackerService.getQuoteInformation(symbol),
      })
        .pipe(
          map((response: StockInfo) => {
            this.companyNames = response?.companyNames;
            this.quotes = response.quotes;
            const list = {
              description: this.companyNames.result[0].description,
              symbol: this.companyNames.result[0].symbol,
            };
            this.stockDataList.push(list);
            this.quoteData.push(this.quotes);
            this.setQuotes();
          })

        )
        .subscribe()

    );

  }

  setQuotes(): void {
    this.stockDataList.map((element, i) => {
      this.stockList[i] = {
        description: this.stockDataList[i].description,
        symbol: this.stockDataList[i].symbol,
        d: this.quoteData[i]?.d,
        c: this.quoteData[i]?.c,
        o: this.quoteData[i]?.o,
        h: this.quoteData[i]?.h,
      };
    });
    localStorage.setItem('stockDataList', JSON.stringify(this.stockList));
    this.stockTrackingForm.reset();
    this.loading = false;
  }

  removeStockItem(value: number): void {
    this.stockList.splice(value, 1);
    this.stockDataList = this.stockList;
    localStorage.setItem('stockDataList', JSON.stringify(this.stockList));
  }
}
