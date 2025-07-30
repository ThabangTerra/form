import { Component } from '@angular/core';
import { Card } from '../card/card';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FromDetailsService} from '../from-details-service';


@Component({
   standalone: true,
  selector: 'app-main-content',
  imports: [Card, FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {
 selectedCard: number | null = null;
  showFullPrivacy = false;
  isSubmitting = false;
  cards = [
    { id: 1, title: 'Life Insurance', imageUrl: 'https://via.placeholder.com/200x150?text=Life+Insurance' },
    { id: 2, title: 'Car Insurance', imageUrl: 'https://via.placeholder.com/200x150?text=Car+Insurance' }
  ];

  insuranceForm: ReturnType<FormBuilder['group']>;
  
  constructor(private fb: FormBuilder,
    private router: Router, private fromDetailSerive: FromDetailsService) {

    this.insuranceForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [
        Validators.required, 
        Validators.pattern(/^\d{10}$/), // Exactly 10 digits
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      email: ['', [Validators.required, Validators.email]],
       privacyConsent: [false, [Validators.requiredTrue]]
    });
  }

  onCardSelected(cardId: number) {
    this.selectedCard = this.selectedCard === cardId ? null : cardId;
    if (!this.selectedCard) {
      this.insuranceForm.reset();
    }
  }

  getSelectedCardTitle(): string {
    const card = this.cards.find(c => c.id === this.selectedCard);
    return card ? card.title : '';
  }

  togglePrivacyNotice() {
    this.showFullPrivacy = !this.showFullPrivacy;
      if (!this.showFullPrivacy) {
    this.insuranceForm.get('privacyConsent')?.markAsTouched();
  }
  }

  closeForm() {
    this.selectedCard = null;
    this.insuranceForm.reset();
  }

  
  onSubmit(): void {
    
    if (this.insuranceForm.valid) {
      this.isSubmitting = true;
          const payload = {
      ...this.insuranceForm.value,
      selectedCover: this.getSelectedCardTitle()
    };
      
      this.fromDetailSerive.submitFormData(this.insuranceForm.value).subscribe({
        next: () => {
          this.router.navigate(['/details'], {
            state: { formData: this.insuranceForm.value }
          });
        },
        error: (error: any) => {
          console.error('API error:', error);
          this.router.navigate(['/details'], {
            state: { formData: this.insuranceForm.value }
          });
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.insuranceForm.markAllAsTouched();
    }
  }

    requestCallback() {
    alert('Callback requested! We will contact you soon.');
  }


shouldShowError(controlName: string): boolean {
  const control = this.insuranceForm.get(controlName);
  
  return control 
    ? (control.invalid && (control.dirty || control.touched ))
    : false;
}

  validatePhone(event: KeyboardEvent) {
  const charCode = (event.which) ? event.which : event.keyCode;
  // Only allow numbers (0-9)
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}

}
