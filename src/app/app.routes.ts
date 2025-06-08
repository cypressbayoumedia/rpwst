import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clubs } from './pages/clubs/clubs';
import { ClubDetails } from './pages/club-details/club-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'clubs', component: Clubs },
  { path: 'clubs/:slug', component: ClubDetails },
];
