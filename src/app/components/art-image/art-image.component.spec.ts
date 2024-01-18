import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtImageComponent } from './art-image.component';

describe('ArtImageComponent', () => {
  let component: ArtImageComponent;
  let fixture: ComponentFixture<ArtImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
