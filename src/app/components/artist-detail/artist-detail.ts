import { Component, OnInit }    from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule }         from '@angular/material/card';
import { MatListModule }         from '@angular/material/list';
import { MatIconModule }         from '@angular/material/icon';
import { MatButtonModule }       from '@angular/material/button';
import { ClientCredentialsService, SpotifyAuthResponse } from '../../services/client-credentials';
import { SpotifyApiService }     from '../../services/spotify-api.service';
import { forkJoin, switchMap }   from 'rxjs';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './artist-detail.html',
  styleUrls: ['./artist-detail.css']
})
export class ArtistDetail implements OnInit {
  artist: any = null;
  topTracks: any[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private auth:  ClientCredentialsService,
    private spotify: SpotifyApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.auth.sendAuthRequest().pipe(
      switchMap((tok: SpotifyAuthResponse) =>
        forkJoin({
          artist:   this.spotify.getArtist(id, tok.access_token),
          topTracks: this.spotify.getArtistTopTracks(id, tok.access_token)
        })
      )
    )
    .subscribe({
      next: ({ artist, topTracks }) => {
        this.artist    = artist;
        this.topTracks = topTracks.tracks;
        this.loading   = false;
      },
      error: err => {
        console.error(err);
        this.error   = 'Error cargando datos.';
        this.loading = false;
      }
    });
  }
}
