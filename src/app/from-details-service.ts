import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FromDetailsService {
   constructor(private http: HttpClient) {}

  submitFormData(formData: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', formData)
      .pipe(delay(2000)); // Reduced delay for better UX
  }
}
