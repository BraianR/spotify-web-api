import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ClientCredentialsService } from '../../services/client-credentials';
import { SpotifyApiService } from '../../services/spotify-api.service';
import { Album, AlbumWithNames } from '../../models/models';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './albums.html',
  styleUrls: ['./albums.css'],
})
export class Albums implements OnInit {
  private auth = inject(ClientCredentialsService);
  private spotify = inject(SpotifyApiService);

  releases: AlbumWithNames[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.auth.sendAuthRequest().subscribe({
      next: (tok) => {
        // ASYNC AWAIT HERE
        (async () => {
          try {
            const res = await this.spotify.getNewReleasesAsync(tok.access_token, 20);
            this.releases = res.albums.items.map((a: Album) => ({
              ...a,
              artistNames: a.artists.map((ar) => ar.name).join(', '),
            }));
          } catch {
            this.error = 'Error al cargar nuevos lanzamientos';
          } finally {
            this.loading = false;
          }
        })();
      },
      error: () => {
        this.error = 'Error de autenticación';
        this.loading = false;
      },
    });
  }
}
