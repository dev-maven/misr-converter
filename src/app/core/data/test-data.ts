import { ConvertedCurrency } from '../interfaces/converted-currency';
import { ChartOptions } from '../shared/components/currency-chart/currency-chart.component';

export const TESTCARDDATA = {
  USD: 52.74594999999999,
  JPY: 7197.500150000001,
  GBP: 43.121900000000004,
  CNY: 367.50219999999996,
  AUD: 77.9395,
  CAD: 71.59894999999999,
  CHF: 49.3681,
  HKD: 410.54825,
  SGD: 71.3724,
};

export const TESTCURRENCIESRESULT = {
  success: true,
  timestamp: 1670518922,
  source: 'EUR',
  rates: {
    USD: 1.054919,
    JPY: 143.950003,
    GBP: 0.862438,
    CNY: 7.350044,
    AUD: 1.55879,
    CAD: 1.431979,
    CHF: 0.987362,
    HKD: 8.210965,
    SGD: 1.427448,
  },
};

export const TESTFORMDATA = {
  from: 'EUR',
  to: 'USD',
  amount: 50,
  result: 0,
};

export const TESTCONVERSIONRESULT: ConvertedCurrency = {
  info: {
    rate: 1.05395,
    timeStamp: 1670515863,
  },
  query: {
    amount: 50,
    from: 'EUR',
    to: 'USD',
  },
  result: 52.6975,
  success: true,
};

export const TESTHISTORICALDATA = {
  date: '2022-12-01',
  historical: true,
  rates: {
    EURUSD: 1.052798,
  },
  source: 'EUR',
  success: true,
  timestamp: 1669939199,
};

export const TESTCHARTDATASET = [
  1.137145, 1.122952, 1.121554, 1.107199, 1.054463, 1.073376, 1.047735,
  1.020668, 1.00387, 0.980478, 0.988665, 1.042372,
];

export const TESTCHARTLABEL = [
  "Dec '21",
  "Jan '22",
  "Feb '22",
  "Mar '22",
  "Apr '22",
  "May '22",
  "Jun '22",
  "Jul '22",
  "Aug '22",
  "Sep '22",
  "Oct '22",
  "Nov '22",
];

export const TESTCHARTOPTIONS: ChartOptions = {
  series: [
    {
      name: 'Exchange Rate',
      data: [
        0.838897, 0.865567, 0.879353, 0.862095, 0.862944, 0.886653, 0.879017,
        0.876841, 0.859167, 0.860898,
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  theme: {
    mode: 'dark',
    monochrome: {
      enabled: false,
      color: '#006466',
      shadeTo: 'light',
      shadeIntensity: 0.65,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 8,
  },
  title: {
    text: 'EUR - GBP  Historical Rates Chart',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['#4b4a49', 'transparent'],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: [
      "Jul '22",
      "Aug '22",
      "Sep '22",
      "Oct '22",
      "Nov '22",
      "Dec '22",
      "Feb '23",
      "Apr '23",
      "May '23",
      "Jun '23",
    ],
  },
};
