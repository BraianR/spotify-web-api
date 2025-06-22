import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable, switchMap } from 'rxjs';

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

  getNewReleases(token: string, limit = 20) {
    return this.http.get<any>(
      `${this.baseUrl}/browse/new-releases`,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        params: new HttpParams().set('limit', `${limit}`)
      }
    );
  }

   /** 
   * ASYNC AWAIT HERE: 
   */
   getNewReleasesAsync(token: string, limit = 20): Promise<any> {
    return lastValueFrom(this.getNewReleases(token, limit));
  }

    getAlbum(id: string, token: string): Observable<any> {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      return this.http.get<any>(`${this.baseUrl}/albums/${id}`, { headers });
    }
  
    getAlbumTracks(id: string, token: string, limit = 50): Observable<any> {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      const params  = new HttpParams().set('limit', `${limit}`);
      return this.http.get<any>(
        `${this.baseUrl}/albums/${id}/tracks`,
        { headers, params }
      );
    }

    search(
      query: string,
      types: ('artist' | 'album')[],
      token: string,
      limit = 5
    ): Observable<any> {
      const params = new HttpParams()
        .set('q', query)
        .set('type', types.join(','))
        .set('limit', limit.toString());
  
      return this.http.get<any>(
        `${this.baseUrl}/search`,
        { ...this.authHeaders(token), params }
      );
    }
}
