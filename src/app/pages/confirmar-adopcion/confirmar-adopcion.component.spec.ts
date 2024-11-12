import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarAdopcionComponent } from './confirmar-adopcion.component';

describe('ConfirmarAdopcionComponent', () => {
  let component: ConfirmarAdopcionComponent;
  let fixture: ComponentFixture<ConfirmarAdopcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarAdopcionComponent]
    });
    fixture = TestBed.createComponent(ConfirmarAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
