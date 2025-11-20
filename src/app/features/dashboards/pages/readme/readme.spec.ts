import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Readme } from './readme';

describe('Readme', () => {
  let component: Readme;
  let fixture: ComponentFixture<Readme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Readme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Readme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
