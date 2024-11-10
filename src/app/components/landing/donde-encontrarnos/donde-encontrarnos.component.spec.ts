import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DondeEncontrarnosComponent } from './donde-encontrarnos.component';

describe('DondeEncontrarnosComponent', () => {
  let component: DondeEncontrarnosComponent;
  let fixture: ComponentFixture<DondeEncontrarnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DondeEncontrarnosComponent]
    });
    fixture = TestBed.createComponent(DondeEncontrarnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
