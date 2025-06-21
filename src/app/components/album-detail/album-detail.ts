import { Component, OnInit }            from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule }                from '@angular/material/card';
import { MatIconModule }                from '@angular/material/icon';
import { MatListModule }                from '@angular/material/list';
import { ClientCredentialsService, SpotifyAuthResponse } from '../../services/client-credentials';
import { SpotifyApiService }            from '../../services/spotify-api.service';

interface RawTrack {
  name: string;
  duration_ms: number;
  track_number: number;
}

interface RawAlbum {
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
  release_date: string;
}

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './album-detail.html',
  styleUrls:   ['./album-detail.css']
})
export class AlbumDetail implements OnInit {
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
  error   = '';

  constructor(
    private route:  ActivatedRoute,
    private auth:   ClientCredentialsService,
    private spotify:SpotifyApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.auth.sendAuthRequest().subscribe({
      next: (tok: SpotifyAuthResponse) => {

        this.spotify.getAlbum(id, tok.access_token).subscribe({
          next: (alb: RawAlbum) => {
            this.albumName      = alb.name;
            this.albumImageUrl  = alb.images?.[0]?.url;
            this.albumArtists   = alb.artists.map(a => a.name).join(', ');
            this.albumRelease   = alb.release_date;
          },
          error: () => {
            this.error = 'Error al cargar datos del álbum';
          }
        });

        this.spotify.getAlbumTracks(id, tok.access_token).subscribe({
          next: (res: { items: RawTrack[] }) => {
            this.tracks = res.items.map(t => ({
              number:   t.track_number,
              name:     t.name,
              duration: (t.duration_ms / 60000).toFixed(2) + ' min'
            }));
            this.loading = false;
          },
          error: () => {
            this.error = 'Error al cargar pistas';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error   = 'Error de autenticación';
        this.loading = false;
      }
    });
  }
}
