import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CurrencyChartComponent } from './currency-chart.component';
import { TESTCHARTOPTIONS } from 'src/app/core/data/test-data';

describe('CurrencyChartComponent', () => {
  let component: CurrencyChartComponent;
  let fixture: ComponentFixture<CurrencyChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyChartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CurrencyChartComponent);
        component = fixture.componentInstance;
        component.chartOptions = TESTCHARTOPTIONS;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render Chart`, () => {
    const childDebugElement = fixture.debugElement.query(By.css('#chart'));
    expect(childDebugElement.nativeElement).toBeTruthy();
  });
});
