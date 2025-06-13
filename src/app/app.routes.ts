import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clubs } from './pages/clubs/clubs';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'clubs', component: Clubs },
  { path: 'clubs/:slug', loadComponent: () => import('./pages/club-details/club-details').then(m => m.ClubDetails)  },
  { path: 'resources', loadComponent: () => import('./pages/resources/resources').then(m => m.Resources)}
];
