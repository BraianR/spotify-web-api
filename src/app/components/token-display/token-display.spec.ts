import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDisplay } from './token-display';

describe('TokenDisplay', () => {
  let component: TokenDisplay;
  let fixture: ComponentFixture<TokenDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
