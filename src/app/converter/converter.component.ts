import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrencyAPIService } from '../Shared/currency-api.service';
import { Currency } from '../Shared/currency';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  ignoredFirstEvent = false;
  initValue;
  converterForm = new FormGroup({
    Amount: new FormControl('', [Validators.required]),
    CurrenciesBase: new FormControl('', [Validators.required]),
    CurrenciesResult: new FormControl('', [Validators.required]),
    AmountConverted: new FormControl('', [Validators.required]),
  })
  public outCurr = this.actRoute.snapshot.params['currency'];
  public inCurr = this.actRoute.snapshot.queryParams['BaseCurr'];
  public Amount = this.actRoute.snapshot.queryParams['Amount'];
  AmountConverted: any;
  currencyData: any;
  public currencyOptions: Currency[] = this.restApi.getCurrencies();
  public currentSelection: any;
  public currentResultSelection: any;
  public currentBaseSelection: any;
  constructor(
    public actRoute: ActivatedRoute,
    public router: Router,
    public restApi: CurrencyAPIService,

  ) {
  }

  ngOnInit(): void {
    console.log(this.outCurr + " & " + this.Amount);
    this.currencyOptions.forEach((value) => {
      if (this.outCurr == value.currency) {
        this.currentResultSelection = value;
      }
      if (this.inCurr == value.currency) {
        this.currentBaseSelection = value;
      }

    });

    this.restApi.getData().subscribe((data) => {
      this.currencyData = data;
      console.log(this.currencyData)
      this.AmountConverted = this.output();
      //this.inCurr = this.currencyData.rates[this.currency];
    }
    );

  }
  onResultCurrencyChange(selectControl) {
    if (selectControl.currency) {
      this.currentResultSelection = selectControl;
      this.outCurr = selectControl.currency;
      this.AmountConverted = this.output();
    }

  }
  onBaseCurrencyChange(selectControl) {
    if (selectControl.currency) {
      this.currentBaseSelection = selectControl;
      this.inCurr = selectControl.currency;;
      this.AmountConverted = this.output();
    }

  }

  outputValue = function (input, inCurr, outCurr) {
    console.log(this.Amount);
    return input * this.currencyData.rates[outCurr] / this.currencyData.rates[inCurr];
  };

  output = function () {
    return this.outputValue(this.Amount, this.inCurr, this.outCurr);
  };

  onInput($event) {
    if (!(this.converterForm.controls.Amount.pristine)) {
      this.Amount = this.converterForm.value.Amount;
      this.AmountConverted = this.output();
    }
  }


}
