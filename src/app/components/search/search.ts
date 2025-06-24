// src/app/components/search/search.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientCredentialsService } from '../../services/client-credentials';
import { SpotifyApiService } from '../../services/spotify-api.service';
import { Artist, AlbumWithNames, SearchResponse, Album } from '../../models/models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class Search {
  private auth = inject(ClientCredentialsService);
  private spotify = inject(SpotifyApiService);
  private router = inject(Router);

  query = '';
  artists: Artist[] = [];
  albums: AlbumWithNames[] = [];

  loading = false;

  onSearch(): void {
    const q = this.query.trim();
    if (!q) return;

    this.loading = true;
    this.auth.sendAuthRequest().subscribe({
      next: (tok) => {
        this.spotify.search(q, ['artist', 'album'], tok.access_token, 5).subscribe({
          next: (res: SearchResponse) => {
            this.artists = res.artists.items;
            this.albums = res.albums.items.map((a: Album) => ({
              ...a,
              artistNames: a.artists.map((ar) => ar.name).join(', '),
            }));

            this.loading = false;
          },
          error: () => {
            console.error('Error en search()');
            this.loading = false;
          },
        });
      },
      error: () => {
        console.error('Error autenticando');
        this.loading = false;
      },
    });
  }

  gotoArtistDetail(id: string): void {
    this.router.navigate(['/artist', id]);
  }

  gotoAlbumDetail(id: string): void {
    this.router.navigate(['/album', id]);
  }
}
