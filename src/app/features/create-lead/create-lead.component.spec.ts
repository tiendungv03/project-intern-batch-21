import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadComponent } from './create-lead.component';

describe('CreateLeadComponent', () => {
  let component: CreateLeadComponent;
  let fixture: ComponentFixture<CreateLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show the banner before submit', () => {
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;

    expect(text).not.toContain('* Indicates required field.');
  });

  it('should show the banner when a required field is touched and empty', () => {
    const contactNameControl = component.leadForm.get('mainContact.contactName');

    contactNameControl?.markAsTouched();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('* Indicates required field.');
  });

  it('should show required field errors after submit', () => {
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('* Indicates required field.');
  });
});
