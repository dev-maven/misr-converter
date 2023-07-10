import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { ConvertedCurrency } from 'src/app/core/interfaces/converted-currency';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() currencyResult!: ConvertedCurrency;
  @Input() currencies!: string[];
  @Input() showDetailButton = false;
  @Input() from = '';
  @Input() to = '';
  @Input() rate = 'Unavailable';
  @Output() convertCurrency = new EventEmitter();
  @Output() navigateToDetail = new EventEmitter();
  @Output() currentResult = new EventEmitter();
  fromCurrencies!: string[];
  toCurrencies!: string[];
  arrow = faArrowsLeftRight;
  converterForm = this.fb.group({
    amount: ['', Validators.required],
    from: [{ value: this.from ? this.from : 'EUR', disabled: true }],
    to: [{ value: this.to ? this.to : 'USD', disabled: true }],
    result: [''],
  });
  amountSub: Subscription | undefined;
  fromSub: Subscription | undefined;
  toSub: Subscription | undefined;
  resultSub: Subscription | undefined;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fromCurrencies = [...this.currencies];
    this.toCurrencies = [...this.currencies];
    this.amountSub = this.converterForm
      .get('amount')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((res) => {
        this.enableForm(res);
      });
    this.fromSub = this.converterForm
      .get('from')
      ?.valueChanges.subscribe((res) => this.filterCurrency(res, 'from'));
    this.toSub = this.converterForm
      .get('to')
      ?.valueChanges.subscribe((res) => this.filterCurrency(res, 'to'));

    this.resultSub = this.converterForm.valueChanges.subscribe(() => {
      this.currentResult.emit(this.converterForm.get('result')?.value);
    });
  }

  ngOnChanges() {
    if (this.from && this.to) {
      const currentRate = this.rate;
      this.patchFormControl('from', this.from);
      this.patchFormControl('to', this.to);
      setTimeout(() => (this.rate = currentRate), 400);
    }
    if (this.currencyResult?.success) {
      this.patchFormControl(
        'from',
        this.currencyResult.query.from.toUpperCase()
      );
      this.patchFormControl('to', this.currencyResult.query.to.toUpperCase());
      this.patchFormControl(
        'amount',
        this.currencyResult.query.amount.toString()
      );
      this.enableForm(this.converterForm.get('amount')?.value || '');

      setTimeout(() => {
        this.rate = this.currencyResult.info.rate.toString();
        this.patchFormControl(
          'result',
          this.currencyResult?.result?.toString()
        );
      }, 400);
    }
  }

  patchFormControl(field: string, value: string) {
    this.converterForm.get(field)?.patchValue(value);
  }

  switchCurrency() {
    const to = this.converterForm.get('to')?.value;
    const from = this.converterForm.get('from')?.value;
    this.rate = 'Unavailable';
    this.converterForm.get('result')?.patchValue('');
    this.converterForm.get('to')?.patchValue(from || null);
    this.converterForm.get('from')?.patchValue(to || null);
  }
  onConvert() {
    this.convertCurrency.emit(this.converterForm.value);
  }

  filterCurrency(value: string | null, category: string) {
    this.rate = 'Unavailable';
    this.converterForm.get('result')?.patchValue('');
    if (category === 'from') {
      this.toCurrencies = this.currencies.filter((item) => item !== value);
    } else {
      this.fromCurrencies = this.currencies.filter((item) => item !== value);
    }
  }

  onNavigate() {
    this.navigateToDetail.emit();
  }

  enableForm(amount: string | null) {
    if (amount) {
      this.converterForm.get('from')?.enable();
      this.converterForm.get('to')?.enable();
    } else {
      this.converterForm.get('from')?.disable();
      this.converterForm.get('to')?.disable();
    }
  }

  ngOnDestroy() {
    if (this.amountSub) {
      this.amountSub.unsubscribe();
    }
    if (this.fromSub) {
      this.fromSub.unsubscribe();
    }
    if (this.toSub) {
      this.toSub.unsubscribe();
    }
    if (this.resultSub) {
      this.resultSub.unsubscribe();
    }
  }
}
