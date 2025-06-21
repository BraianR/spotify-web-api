import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { MatCardModule }          from '@angular/material/card';
import { MatIconModule }          from '@angular/material/icon';
import { ClientCredentialsService } from '../../services/client-credentials';
import { SpotifyApiService }      from '../../services/spotify-api.service';

interface AlbumWithNames {
  id: string;
  name: string;
  images: any[];
  artistNames: string;
}

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './albums.html',
  styleUrls: ['./albums.css']
})
export class Albums implements OnInit {
  releases: AlbumWithNames[] = [];
  loading = true;
  error   = '';

  constructor(
    private auth:    ClientCredentialsService,
    private spotify: SpotifyApiService
  ) {}

  ngOnInit() {
    this.auth.sendAuthRequest().subscribe({
      next: tok => {
        this.spotify.getNewReleases(tok.access_token).subscribe({
          next: res => {
            this.releases = res.albums.items.map((a: any) => ({
              id: a.id,
              name: a.name,
              images: a.images,
              artistNames: a.artists.map((ar: any) => ar.name).join(', ')
            }));
            this.loading = false;
          },
          error: () => {
            this.error   = 'Error al cargar nuevos lanzamientos';
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
