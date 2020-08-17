import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import { CurrencyRates } from './currency-rates'
import { Currency } from './currency'
@Injectable({
  providedIn: 'root'
})
export class CurrencyAPIService {
  private currencies: Currency[] = [
    {
      currency: 'INR',
      index: 0,
      weight: 10
    },
    {
      currency: 'USD',
      index: 1,
      weight: 10
    },
    {
      currency: 'GBP',
      index: 2,
      weight: 10
    },
    {
      currency: 'CAD',
      index: 3,
      weight: 8
    },
    {
      currency: 'EUR',
      index: 4,
      weight: 6
    }
  ];

  getCurrencies(): Currency[] {
    return this.currencies;
  }


  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get("https://api.exchangeratesapi.io/latest?base=INR")
      .pipe(
        retry(1)
      )
  }

  getTrends(currency1, currency2) {
    return this.http.get("https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-09-01&symbols=" + currency1 + "," + currency2)
      .pipe(
        retry(1)
      )
  }
}
