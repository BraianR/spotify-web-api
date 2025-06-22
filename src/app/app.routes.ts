import { Routes } from '@angular/router';
import { SearchArtist } from './components/search-artist/search-artist';
import { Home } from './components/home/home';
import { ArtistDetail } from './components/artist-detail/artist-detail';
import { Albums } from './components/albums/albums';
import { AlbumDetail } from './components/album-detail/album-detail';
import { Search } from './components/search/search';

export const routes: Routes = [
  { path: '',       component: Home },
  { path: 'search', component: Search },
  { path: 'search-artist', component: SearchArtist },
  { path: 'artist/:id', component: ArtistDetail },
  { path: 'albums',     component: Albums },
  { path: 'album/:id',   component: AlbumDetail },
  { path: '**',     redirectTo: '' }
];