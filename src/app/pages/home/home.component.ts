import { Component, OnInit } from '@angular/core';
import { ConversionForm } from '../../core/models/conversion-form';
import { DataService } from '../../core/services/data.service';
import { ConvertedCurrency } from '../../core/models/converted-currency';
import { CURRENCIES } from 'src/app/core/data/currencies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  initRate = 0;
  rateResult!: ConvertedCurrency;
  supportedCurrencies = CURRENCIES;
  cardObject = {};
  from = '';
  to = '';
  amount = '';
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    const routeData = history.state;
    if (routeData) this.rateResult = routeData['currencyResult'];
    if (this.rateResult) {
      this.from = this.rateResult.query.from;
      this.to = this.rateResult.query.to;
      this.amount = this.rateResult.query.amount.toString();
      this.loadCardData();
    }
    const initObject = {
      from: 'EUR',
      to: 'USD',
      amount: 1,
      result: 0,
    };

    this.dataService
      .convertCurrency(initObject)
      .subscribe((res) => (this.initRate = res.result));
  }

  openDetail() {
    this.router.navigateByUrl(`/${this.from}/${this.to}/detail`, {
      state: { currencyResult: this.rateResult },
    });
  }

  loadCardData() {
    this.dataService
      .convertCurrencies(this.from, this.supportedCurrencies)
      .subscribe((res) => {
        for (const key in res.quotes) {
          const newKey = key.substring(3);
          this.cardObject = {
            ...this.cardObject,
            [newKey]: res.quotes[key] * +this.amount,
          };
        }
      });
  }

  convert(formData: any) {
    this.from = formData.from;
    this.to = formData.to;
    this.amount = formData.amount;
    this.dataService
      .convertCurrency(formData)
      .subscribe((res) => (this.rateResult = res));

    this.loadCardData();
  }
}
