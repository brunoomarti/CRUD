import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitulosListComponent } from './titulos-list.component';

describe('TitulosListComponent', () => {
  let component: TitulosListComponent;
  let fixture: ComponentFixture<TitulosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitulosListComponent]
    });
    fixture = TestBed.createComponent(TitulosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
