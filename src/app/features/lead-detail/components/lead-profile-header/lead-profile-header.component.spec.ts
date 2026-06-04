import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadProfileHeaderComponent } from './lead-profile-header.component';

describe('LeadProfileHeaderComponent', () => {
  let component: LeadProfileHeaderComponent;
  let fixture: ComponentFixture<LeadProfileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadProfileHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
