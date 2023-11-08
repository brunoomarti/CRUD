import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitulosFormComponent } from './titulos-form.component';

describe('TitulosFormComponent', () => {
  let component: TitulosFormComponent;
  let fixture: ComponentFixture<TitulosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitulosFormComponent]
    });
    fixture = TestBed.createComponent(TitulosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
