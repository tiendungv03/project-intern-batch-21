import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadActivitySidebarComponent } from './lead-activity-sidebar.component';

describe('LeadActivitySidebarComponent', () => {
  let component: LeadActivitySidebarComponent;
  let fixture: ComponentFixture<LeadActivitySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadActivitySidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadActivitySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
