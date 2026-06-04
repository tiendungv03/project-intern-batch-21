import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadRelationshipTableComponent } from './lead-relationship-table.component';

describe('LeadRelationshipTableComponent', () => {
  let component: LeadRelationshipTableComponent;
  let fixture: ComponentFixture<LeadRelationshipTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadRelationshipTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadRelationshipTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
