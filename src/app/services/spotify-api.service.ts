import { Injectable, inject }           from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable }    from 'rxjs';

import {
  Artist,
  Album,
  Track,
  SearchResponse,
  NewReleasesResponse,
  AlbumTracksResponse,
  SearchArtistsResponse
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class SpotifyApiService {
  private readonly http    = inject(HttpClient);
  private readonly baseUrl = 'https://api.spotify.com/v1';

  private authHeaders(token: string) {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  searchArtists(
    query: string,
    token: string
  ): Observable<SearchArtistsResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'artist')
      .set('limit', '5');
  
    return this.http.get<SearchArtistsResponse>(
      `${this.baseUrl}/search`,
      { ...this.authHeaders(token), params }
    );
  }

  getArtist(id: string, token: string): Observable<Artist> {
    return this.http.get<Artist>(
      `${this.baseUrl}/artists/${id}`,
      this.authHeaders(token)
    );
  }

  getArtistTopTracks(
    id: string,
    token: string,
    country = 'US'
  ): Observable<{ tracks: Track[] }> {
    const params = new HttpParams().set('country', country);
    return this.http.get<{ tracks: Track[] }>(
      `${this.baseUrl}/artists/${id}/top-tracks`,
      { ...this.authHeaders(token), params }
    );
  }

  getNewReleases(
    token: string,
    limit = 20
  ): Observable<NewReleasesResponse> {
    const params = new HttpParams().set('limit', `${limit}`);
    return this.http.get<NewReleasesResponse>(
      `${this.baseUrl}/browse/new-releases`,
      { ...this.authHeaders(token), params }
    );
  }

  getNewReleasesAsync(
    token: string,
    limit = 20
  ): Promise<NewReleasesResponse> {
    return lastValueFrom(this.getNewReleases(token, limit));
  }

  getAlbum(id: string, token: string): Observable<Album> {
    return this.http.get<Album>(
      `${this.baseUrl}/albums/${id}`,
      this.authHeaders(token)
    );
  }

  getAlbumTracks(
    id: string,
    token: string,
    limit = 50
  ): Observable<AlbumTracksResponse> {
    const params = new HttpParams().set('limit', `${limit}`);
    return this.http.get<AlbumTracksResponse>(
      `${this.baseUrl}/albums/${id}/tracks`,
      { ...this.authHeaders(token), params }
    );
  }

  search(
    query: string,
    types: ('artist' | 'album')[],
    token: string,
    limit = 20
  ): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', types.join(','))
      .set('limit', `${limit}`);

    return this.http.get<SearchResponse>(
      `${this.baseUrl}/search`,
      { ...this.authHeaders(token), params }
    );
  }
}
