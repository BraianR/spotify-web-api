import { Component }            from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule }        from '@angular/material/card';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { SpotifyApiService }    from '../../services/spotify-api.service';
import { ClientCredentialsService } from '../../services/client-credentials';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
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
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  searchQuery = '';
  artists: any[] = [];
  token = '';

  constructor(
    private auth:   ClientCredentialsService,
    private spotify:SpotifyApiService,
    private router: Router
  ) {

    this.auth.sendAuthRequest().subscribe(res => this.token = res.access_token);
  }

  search() {
    if (!this.token || !this.searchQuery.trim()) return;
    this.spotify.searchArtists(this.searchQuery, this.token)
      .subscribe(res => this.artists = res.artists.items);
  }

  goToArtist(id: string) {
    this.router.navigate(['/artist', id]);
  }
}
