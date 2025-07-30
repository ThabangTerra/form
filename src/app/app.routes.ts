import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { Details } from './details/details';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-content/main-content').then(m => m.MainContent)
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details').then(m => m.Details)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
