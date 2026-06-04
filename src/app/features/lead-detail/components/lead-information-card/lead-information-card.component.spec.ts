import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadInformationCardComponent } from './lead-information-card.component';

describe('LeadInformationCardComponent', () => {
  let component: LeadInformationCardComponent;
  let fixture: ComponentFixture<LeadInformationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadInformationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadInformationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
