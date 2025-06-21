import { Routes } from '@angular/router';
import { Search } from './components/search/search';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '',       component: Home },
  { path: 'search', component: Search },
  { path: '**',     redirectTo: '' }
];