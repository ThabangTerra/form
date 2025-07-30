import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { FromDetailsService } from '../from-details-service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details   {
 formData: any = null; 
  isLoading = true;

  constructor(private router: Router, private fromDetailService: FromDetailsService) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { formData: any };

    if (state?.formData) {
      // Simulate delay like your service does
      this.fromDetailService.submitFormData(state.formData).subscribe({
        next: (data) => {
          this.formData = data; // 👈 used in HTML
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
