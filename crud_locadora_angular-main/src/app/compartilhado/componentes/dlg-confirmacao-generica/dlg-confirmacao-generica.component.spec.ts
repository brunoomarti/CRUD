import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgConfirmacaoGenericaComponent } from './dlg-confirmacao-generica.component';

describe('DlgConfirmacaoGenericaComponent', () => {
  let component: DlgConfirmacaoGenericaComponent;
  let fixture: ComponentFixture<DlgConfirmacaoGenericaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgConfirmacaoGenericaComponent]
    });
    fixture = TestBed.createComponent(DlgConfirmacaoGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
