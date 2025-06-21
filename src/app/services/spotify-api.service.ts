import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpotifyApiService {
  private baseUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  private authHeaders(token: string) {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  searchArtists(query: string, token: string): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'artist')
      .set('limit', '1');
    return this.http.get<any>(
      `${this.baseUrl}/search`,
      { ...this.authHeaders(token), params }
    );
  }

  getArtist(id: string, token: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/artists/${id}`,
      this.authHeaders(token)
    );
  }

  getArtistTopTracks(
    id: string,
    token: string,
    country = 'US'
  ): Observable<any> {
    const params = new HttpParams().set('country', country);
    return this.http.get<any>(
      `${this.baseUrl}/artists/${id}/top-tracks`,
      { ...this.authHeaders(token), params }
    );
  }
}
