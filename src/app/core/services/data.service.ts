import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConvertedCurrency } from '../interfaces/converted-currency';
import { ConversionForm } from '../interfaces/conversion-form';

@Injectable()
export class DataService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  convertCurrency(formData: ConversionForm): Observable<ConvertedCurrency> {
    return this.http.get<ConvertedCurrency>(
      `${this.baseUrl}convert?to=${formData.to}&from=${formData.from}&amount=${formData.amount}`
    );
  }

  convertCurrencies(source: string, currencies: string[]): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}latest?symbols=${currencies.toString()}&base=${source}`
    );
  }

  history(source: string, currencies: string, date: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}${date}?symbols=${currencies}&base=${source}`
    );
  }
}
