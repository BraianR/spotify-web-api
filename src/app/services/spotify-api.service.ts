import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor(private http: HttpClient) {}

  searchArtists(query: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`,
      { headers }
    );
  }
}
