import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCitasComponent } from './ver-citas.component';

describe('VerCitasComponent', () => {
  let component: VerCitasComponent;
  let fixture: ComponentFixture<VerCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCitasComponent]
    });
    fixture = TestBed.createComponent(VerCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
