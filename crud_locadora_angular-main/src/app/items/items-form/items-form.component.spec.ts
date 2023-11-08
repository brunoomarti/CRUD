import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFormComponent } from './items-form.component';

describe('ItemsFormComponent', () => {
  let component: ItemsFormComponent;
  let fixture: ComponentFixture<ItemsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsFormComponent]
    });
    fixture = TestBed.createComponent(ItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
