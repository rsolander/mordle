import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterStateComponent } from './letter-state.component';

describe('LetterStateComponent', () => {
  let component: LetterStateComponent;
  let fixture: ComponentFixture<LetterStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
