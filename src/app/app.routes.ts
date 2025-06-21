import { Routes } from '@angular/router';
import { Search } from './components/search/search';
import { Home } from './components/home/home';
import { ArtistDetail } from './components/artist-detail/artist-detail';
import { Albums } from './components/albums/albums';

export const routes: Routes = [
  { path: '',       component: Home },
  { path: 'search', component: Search },
  { path: 'artist/:id', component: ArtistDetail },
  { path: 'albums',     component: Albums },
  { path: '**',     redirectTo: '' }
];