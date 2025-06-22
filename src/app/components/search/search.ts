import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule }      from '@angular/material/card';
import { MatIconModule }      from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { ClientCredentialsService } from '../../services/client-credentials';
import { SpotifyApiService }        from '../../services/spotify-api.service';

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
  styleUrls:   ['./search.css']
})
export class Search {
  query   = '';
  artists: any[] = [];
  albums:  Array<any & { artistNames: string }> = [];

  constructor(
    private auth:    ClientCredentialsService,
    private spotify: SpotifyApiService,
    private router:  Router
  ) {}

  onSearch() {
    if (!this.query.trim()) return;
    this.auth.sendAuthRequest().subscribe({
      next: tok => {
        this.spotify
          .search(this.query, ['artist','album'], tok.access_token, 5)
          .subscribe(res => {
            this.artists = res.artists?.items || [];
  
            this.albums = (res.albums?.items || []).map((a: any) => ({
              ...a,
              artistNames: (a.artists as any[]).map((ar: any) => ar.name).join(', ')
            }));
          });
      },
      error: () => console.error('Error autenticando')
    });
  }
  

  gotoArtistDetail(id: string) {
    this.router.navigate(['/artist', id]);
  }

  gotoAlbumDetail(id: string) {
    this.router.navigate(['/album',  id]);
  }
}
