import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAlertBannerComponent } from './lead-alert-banner.component';

describe('LeadAlertBannerComponent', () => {
  let component: LeadAlertBannerComponent;
  let fixture: ComponentFixture<LeadAlertBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadAlertBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadAlertBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
