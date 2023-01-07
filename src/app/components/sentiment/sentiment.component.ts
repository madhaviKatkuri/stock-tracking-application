import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sentiment, SentimentInfo } from 'src/app/model/sentimentdata';
import { SentimentService } from 'src/app/services/sentiment.service';
@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent {
  sentimentDataList: Sentiment[] = [];
  symbol: string;
  fromDate: string;
  symbolName: string;
  loading: boolean = false;
  subData$: Subscription = new Subscription();

  constructor(
    private readonly sentimentService: SentimentService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getSentimentDateDetails();
    this.getSentimentData();
  }

  ngOnDestroy(): void {
    this.subData$.unsubscribe();
  }

  getSentimentDateDetails(): void {
    const todayDate = new Date().toISOString().slice(0, 10);
    const d = new Date(todayDate);
    d.setMonth(d.getMonth() - 4);
    this.fromDate = d.toISOString().slice(0, 10);
  }

  getSentimentData(): void {
    this.loading = true;
    this.sub();
  }
  private sub(): void {
    this.subData$.add(
      this.sentimentService
        .getSentimentData(this.symbol, this.fromDate)
        .subscribe((res: SentimentInfo) => {
          this.sentimentDataList = res.data;
          this.symbolName = res.symbol;
          this.loading = false;
        })
    );
  }

  getMonthDetails(num: number): string {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[num - 1].toUpperCase();
  }

}

