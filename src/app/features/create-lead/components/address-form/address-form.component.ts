import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;

  verifyAddress(): void {
    // placeholder implementation — later hook up to geocoding/validation API
    console.log('Verify address clicked', this.formGroup?.value);
  }
}