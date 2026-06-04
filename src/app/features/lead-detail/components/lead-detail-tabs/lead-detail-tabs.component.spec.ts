import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetailTabsComponent } from './lead-detail-tabs.component';

describe('LeadDetailTabsComponent', () => {
  let component: LeadDetailTabsComponent;
  let fixture: ComponentFixture<LeadDetailTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadDetailTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadDetailTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
