import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DlgGenericaComponent} from './dlg-generica.component';

describe('MensagemErroComponent', () => {
  let component: DlgGenericaComponent;
  let fixture: ComponentFixture<DlgGenericaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgGenericaComponent]
    });
    fixture = TestBed.createComponent(DlgGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
