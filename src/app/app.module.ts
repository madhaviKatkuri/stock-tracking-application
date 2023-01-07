import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';

import { StockTrackerService } from './services/stock-tracker.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SentimentService } from './services/sentiment.service';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockHeaderComponent } from './components/stock-header/stock-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SentimentComponent,
    StockHeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [StockTrackerService, SentimentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
