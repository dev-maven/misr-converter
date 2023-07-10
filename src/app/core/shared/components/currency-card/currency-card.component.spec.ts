import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyCardComponent } from './currency-card.component';

describe('CurrencyCardComponent', () => {
  let component: CurrencyCardComponent;
  let fixture: ComponentFixture<CurrencyCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyCardComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CurrencyCardComponent);
        component = fixture.componentInstance;
        component.from = '50';
        component.to = '52.79665';
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render To`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#to')?.textContent).toContain(component.to);
  });

  it(`should render From`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#from')?.textContent).toContain(
      component.from
    );
  });
});
