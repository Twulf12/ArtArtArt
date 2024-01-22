import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithBtnComponent } from './text-with-btn.component';

describe('TextWithBtnComponent', () => {
  let component: TextWithBtnComponent;
  let fixture: ComponentFixture<TextWithBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWithBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextWithBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
