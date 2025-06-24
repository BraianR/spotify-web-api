import { Component, OnInit, inject }       from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { Router, RouterModule }             from '@angular/router';
import { MatCardModule }                    from '@angular/material/card';
import { MatFormFieldModule }               from '@angular/material/form-field';
import { MatInputModule }                   from '@angular/material/input';
import { MatButtonModule }                  from '@angular/material/button';
import { MatIconModule }                    from '@angular/material/icon';

import { ClientCredentialsService }         from '../../services/client-credentials';
import { SpotifyApiService }                from '../../services/spotify-api.service';
import { Artist, SearchArtistsResponse } from '../../models/models';

@Component({
  selector: 'app-search-artist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './search-artist.html',
  styleUrls: ['./search-artist.css']
})
export class SearchArtist implements OnInit {
  private auth    = inject(ClientCredentialsService);
  private spotify = inject(SpotifyApiService);
  private router  = inject(Router);

  searchQuery = '';
  artists: Artist[] = [];
  token = '';

  ngOnInit(): void {
    this.auth.sendAuthRequest()
      .subscribe(res => this.token = res.access_token);
  }

  search(): void {
    const q = this.searchQuery.trim();
    if (!this.token || !q) { return; }

    this.spotify
      .searchArtists(q, this.token)
      .subscribe((res: SearchArtistsResponse) => {
        this.artists = res.artists.items;
      });
  }

  goToArtist(id: string): void {
    this.router.navigate(['/artist', id]);
  }
}
