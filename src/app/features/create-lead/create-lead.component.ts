import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { AddressFormComponent } from './components/address-form/address-form.component';
import { CreateLeadSidebarComponent } from './components/create-lead-sidebar/create-lead-sidebar.component';
import { MainContactFormComponent } from './components/main-contact-form/main-contact-form.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';

@Component({
  selector: 'app-create-lead',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CreateLeadSidebarComponent,
    MainContactFormComponent,
    PersonalInfoFormComponent,
    AddressFormComponent,

  ],
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss'],
})
export class CreateLeadComponent {
  constructor(private fb: FormBuilder) {}

  submitted = false;

 leadForm = this.fb.group({
  mainContact: this.fb.group({
    contactName: ['', Validators.required],
      cellphoneCode: ['(+1)'], 
    cellphone: ['', Validators.required],
    email: [''],
    workPhone: [''],
    workPhoneCode: ['(+1)'],
  }),

  personalInfo: this.fb.group({
    fullName: [''],
    otherName: [''],
    cellphoneCode: ['(+1)'],
    cellphone: [''],
    workPhoneCode: ['(+1)'],
    workPhone: [''],
    email: [''],
    gender: [''],
    dateOfBirth: [''],
    maritalStatus: [''],
    leadStatus: ['', Validators.required],
    leadStage: [''],
    leadTags: [''],
  }),

  address: this.fb.group({
    address: [''],
    city: [''],
    state: [''],
    zipCode: [''],
  }),
});                         

get mainContact(): FormGroup {
  return this.leadForm.get('mainContact') as FormGroup;
}

get personalInfo(): FormGroup {
  return this.leadForm.get('personalInfo') as FormGroup;
}

get address(): FormGroup {
  return this.leadForm.get('address') as FormGroup;
}

  onSubmit() {
    this.submitted = true;
    this.leadForm.markAllAsTouched();

    if (this.leadForm.invalid) {
      console.log('Form invalid');
      return;
    }

    console.log('DATA:', this.leadForm.value);
  }

  onCancel() {
    history.back();
  }

  get showRequiredBanner(): boolean {
    return this.hasTouchedRequiredError() || (this.submitted && this.leadForm.invalid);
  }

  private hasTouchedRequiredError(): boolean {
    const requiredControls: Array<AbstractControl | null> = [
      this.leadForm.get('mainContact.contactName'),
      this.leadForm.get('mainContact.cellphone'),
      this.leadForm.get('personalInfo.leadStatus'),
    ];

    return requiredControls.some((control) => {
      return !!control && control.touched && control.hasError('required');
    });
  }
}