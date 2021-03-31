import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPOComponent } from './new-po.component';

describe('NewPOComponent', () => {
  let component: NewPOComponent;
  let fixture: ComponentFixture<NewPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
