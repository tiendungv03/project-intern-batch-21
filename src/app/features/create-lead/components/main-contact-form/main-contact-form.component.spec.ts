import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContactFormComponent } from './main-contact-form.component';

describe('MainContactFormComponent', () => {
  let component: MainContactFormComponent;
  let fixture: ComponentFixture<MainContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContactFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
