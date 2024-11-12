import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoAdopcionComponent } from './proceso-adopcion.component';

describe('ProcesoAdopcionComponent', () => {
  let component: ProcesoAdopcionComponent;
  let fixture: ComponentFixture<ProcesoAdopcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesoAdopcionComponent]
    });
    fixture = TestBed.createComponent(ProcesoAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
