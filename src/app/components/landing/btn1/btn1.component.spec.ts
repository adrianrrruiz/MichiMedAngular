import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Btn1Component } from './btn1.component';

describe('Btn1Component', () => {
  let component: Btn1Component;
  let fixture: ComponentFixture<Btn1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Btn1Component]
    });
    fixture = TestBed.createComponent(Btn1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
