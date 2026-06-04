import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadSidebarComponent } from './create-lead-sidebar.component';

describe('CreateLeadSidebarComponent', () => {
  let component: CreateLeadSidebarComponent;
  let fixture: ComponentFixture<CreateLeadSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeadSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLeadSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
