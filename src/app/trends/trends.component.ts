import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyAPIService } from 'src/app/Shared/currency-api.service';
import { Chart } from 'chart.js';
import { Currency } from '../Shared/currency';
@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  Linechart = [];
  public Data = [];
  currency = this.actRoute.snapshot.params['currency'];
  public inCurr = this.actRoute.snapshot.queryParams['BaseCurr'];
  public trendsData: any;
  public trendDataRates: any;
  public trendDataValues = [];
  public currencyTrend1Values = [];
  public cuurencyTrend2Values = [];

  public currencyOptions: Currency[] = this.restApi.getCurrencies();
  constructor(
    public restApi: CurrencyAPIService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.restApi.getTrends(this.currency, this.inCurr).subscribe((data) => {
      this.trendsData = data;
      console.log(this.trendsData);
      this.getRates();
      this.Linechart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.Data,
          datasets: [
            {
              label: this.currency,
              data: this.currencyTrend1Values,
              borderColor: '#3cb371',
              backgroundColor: "grey",
            }, {
              label: this.inCurr,
              data: this.cuurencyTrend2Values,
              borderColor: '#3cb371',
              backgroundColor: "white",
              type: 'bar'
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Currency trends for ' + this.currency + ' & ' + this.inCurr
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        },
        datasetoverride: [
          {
            yAxisID: 'y-axis-1',
            label: "Total OTS Count",
            borderWidth: 3,
            lineTension: 0,
            borderColor: "rgba(255, 159, 64, 1)",
            /* 			hoverBackgroundColor: "rgba(255,99,132,0.4)",
                  hoverBorderColor: "rgba(255,99,132,1)",
                  pointBorderColor: 'rgb(10,10,10)', */
            pointRadius: 0,
            fill: false,
            type: 'line',
          },
          {
            yAxisID: 'y-axis-1',
            label: "OTS Success Count",
            pointRadius: 0,
            borderWidth: -50,
            showLine: false,
            pointHoverRadius: 0,
            fill: false,
            type: 'bar',

          },
        ]
      });
    })

  }

  onCurrency1Change(selection) {
    console.log(selection);
  }
  getRates() {
    this.trendDataRates = Object.keys(this.trendsData.rates);
    this.trendDataRates.forEach((value) => {
      this.Data.push(value);
      var curr = this.currency;
      this.trendDataValues.push(this.trendsData.rates[value]);
    });
    this.trendDataValues.forEach((value) => {
      this.currencyTrend1Values.push(value[this.currency]);
      this.cuurencyTrend2Values.push(value[this.inCurr]);
    })
  }

}
