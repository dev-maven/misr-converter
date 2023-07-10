/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ConvertedCurrency {
  info: infoObject;
  query: queryObject;
  result: number;
  success: boolean;
}

export interface ConvertedCurrencies {
  base: string;
  date: string;
  rates: any;
  success: boolean;
  timestamp: number;
}

interface infoObject {
  rate: number;
  timeStamp: number;
}

interface queryObject {
  amount: number;
  from: string;
  to: string;
}
