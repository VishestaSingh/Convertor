import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrencyAPIService } from 'src/app/Shared/currency-api.service';
import { Currency } from '../Shared/currency';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currency = ["INR", "EUR", "USD", "GBP", "CAD"];
  coversion: any;
  selectedCurr: string;
  selectBaseCurr: string;
  public validator: boolean = false;
  currencyForm = new FormGroup({
    Amount: new FormControl('', [Validators.required]),
    Currencies: new FormControl('', [Validators.required]),
  })
  public currencyOptions: Currency[] = this.restApi.getCurrencies();
  constructor(
    public restApi: CurrencyAPIService,
    public actRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.currencyForm.value.Amount)
    this.restApi.getData().subscribe((data) => {
      this.coversion = data;
      console.log(this.coversion);
      this.checkValidation();
    })

  }
  checkValidation() {
    if ((this.currencyForm.controls.Amount.status == "VALID") && (this.selectBaseCurr != undefined) && (this.selectedCurr != undefined)) {
      this.validator = true
    }

  }
  selectedCurrency(curr: string) {
    console.log("Currency selected is :" + curr);
    return curr;
  }

  selectedBaseCurrency(curr) {
    this.selectBaseCurr = "";
    this.selectBaseCurr = this.selectedCurrency(curr);
    this.checkValidation();
  }

  selectedResultCurrency(curr) {
    this.selectedCurr = "";
    this.selectedCurr = this.selectedCurrency(curr);
    this.checkValidation();
  }

}
