import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-main-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputMaskModule, DropdownModule, FloatLabelModule, NgxIntlTelInputModule, InputGroupModule, InputTextModule],
  templateUrl: './main-contact-form.component.html',
  styleUrl: './main-contact-form.component.scss',
})
export class MainContactFormComponent implements OnInit  {
  @Input({ required: true }) formGroup!: FormGroup;
  countriesa = [
  { name: 'United States', dialCode: '(+1)' },
  { name: 'Vietnam', dialCode: '(+84)' },
  { name: 'Japan', dialCode: '(+81)' }
];

// selectedCountry = this.countriesa[0];

//   phone = '';
//   workPhone = '';
//   selectedCellphoneCountry: any = null;



  openCellphoneDropdown = false;
  selectedCellphoneCode = '+1';
  openWorkPhoneDropdown = false;
  selectedWorkPhoneCode = '+1';

  countries = [
    { code: '+1', name: 'USA' },
    { code: '+84', name: 'Vietnam' },
    { code: '+44', name: 'UK' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' },
  ];


  ngOnInit(): void {
  this.formGroup.patchValue({
    cellphoneCode: '(+1)'
  });
}
  isInvalid(controlName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
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