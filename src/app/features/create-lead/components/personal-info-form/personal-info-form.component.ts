import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-personal-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputMaskModule],
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent implements OnInit {
  @Input({ required: true }) formGroup!: FormGroup;

  openCellphoneDropdown = false;
  selectedCellphoneCode = '+1';
  openWorkPhoneDropdown = false;
  selectedWorkPhoneCode = '+1';
  cellphoneCode: string = '(+1)';
  workPhoneCode: string = '(+1)';

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  maritalStatusOptions = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
  ];

  leadStatusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Contacted', value: 'Contacted' },
    { label: 'Qualified', value: 'Qualified' },
  ];

  leadStageOptions = [
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Opportunity', value: 'Opportunity' },
    { label: 'Proposal', value: 'Proposal' },
  ];

  leadTagsOptions = [
    { label: 'VIP', value: 'VIP' },
    { label: 'Important', value: 'Important' },
    { label: 'Follow-up', value: 'Follow-up' },
  ];

  countryCodes = [
    { code: '+1', name: 'USA' },
    { code: '+84', name: 'Vietnam' },
    { code: '+44', name: 'UK' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' },
  ];

  // same shape as used in main-contact-form (dialCode with parentheses)
  countriesa = [
    { name: 'United States', dialCode: '(+1)' },
    { name: 'Vietnam', dialCode: '(+84)' },
    { name: 'Japan', dialCode: '(+81)' }
  ];

  isInvalid(controlName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  ngOnInit(): void {
    if (this.formGroup) {
      this.formGroup.patchValue({
        workPhoneCode: this.workPhoneCode,
        cellphoneCode: this.cellphoneCode
      });
    }
  }

  toggleCellphoneDropdown() {
    this.openCellphoneDropdown = !this.openCellphoneDropdown;
  }

  selectCellphoneCode(code: string) {
    this.selectedCellphoneCode = code;
    this.openCellphoneDropdown = false;
  }

  toggleWorkPhoneDropdown() {
    this.openWorkPhoneDropdown = !this.openWorkPhoneDropdown;
  }

  selectWorkPhoneCode(code: string) {
    this.selectedWorkPhoneCode = code;
    this.openWorkPhoneDropdown = false;
  }
}