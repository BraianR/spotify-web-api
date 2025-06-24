import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ClientCredentialsService, SpotifyAuthResponse } from '../../services/client-credentials';
import { SpotifyApiService } from '../../services/spotify-api.service';
import { Album, AlbumTracksResponse } from '../../models/models';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatListModule],
  templateUrl: './album-detail.html',
  styleUrls: ['./album-detail.css'],
})
export class AlbumDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(ClientCredentialsService);
  private spotify = inject(SpotifyApiService);

  albumName = '';
  albumImageUrl?: string;
  albumArtists = '';
  albumRelease = '';

  tracks: {
    number: number;
    name: string;
    duration: string;
  }[] = [];

  loading = true;
  error = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.auth.sendAuthRequest().subscribe({
      next: (tok: SpotifyAuthResponse) => {
        this.spotify.getAlbum(id, tok.access_token).subscribe(
          (alb: Album) => {
            this.albumName = alb.name;
            this.albumImageUrl = alb.images?.[0]?.url;
            this.albumArtists = alb.artists.map((a) => a.name).join(', ');
            this.albumRelease = alb.release_date ?? '';
          },
          () => {
            this.error = 'Error al cargar datos del álbum';
          },
        );

        this.spotify.getAlbumTracks(id, tok.access_token).subscribe(
          (res: AlbumTracksResponse) => {
            this.tracks = res.items.map((t) => ({
              number: t.track_number!,
              name: t.name,
              duration: (t.duration_ms! / 60000).toFixed(2) + ' min',
            }));
            this.loading = false;
          },
          () => {
            this.error = 'Error al cargar pistas';
            this.loading = false;
          },
        );
      },
      error: () => {
        this.error = 'Error de autenticación';
        this.loading = false;
      },
    });
  }
}
