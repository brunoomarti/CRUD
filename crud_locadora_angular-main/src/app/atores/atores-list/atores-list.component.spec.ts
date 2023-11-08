import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtoresListComponent } from './atores-list.component';

describe('AtoresListComponent', () => {
  let component: AtoresListComponent;
  let fixture: ComponentFixture<AtoresListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtoresListComponent]
    });
    fixture = TestBed.createComponent(AtoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
