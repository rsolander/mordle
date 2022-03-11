import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharSquareComponent } from './char-square.component';

describe('CharSquareComponent', () => {
  let component: CharSquareComponent;
  let fixture: ComponentFixture<CharSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
