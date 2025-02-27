import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryGridComponent } from './gallery-grid.component';

describe('GalleryGridComponent', () => {
  let component: GalleryGridComponent;
  let fixture: ComponentFixture<GalleryGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryGridComponent]
    });
    fixture = TestBed.createComponent(GalleryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
