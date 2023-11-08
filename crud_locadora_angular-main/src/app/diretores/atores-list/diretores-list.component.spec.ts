import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoresListComponent } from './diretores-list.component';

describe('DiretoresListComponent', () => {
  let component: DiretoresListComponent;
  let fixture: ComponentFixture<DiretoresListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretoresListComponent]
    });
    fixture = TestBed.createComponent(DiretoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
