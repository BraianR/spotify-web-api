import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { spotifyApiKeys } from './api-secrets/spotify-api-keys';

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientCredentialsService {

  constructor(private http: HttpClient) {}

  sendAuthRequest(): Observable<SpotifyAuthResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const authHeader = btoa(`${spotifyApiKeys.CLIENT_ID}:${spotifyApiKeys.CLIENT_SECRET}`);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<SpotifyAuthResponse>(
      'https://accounts.spotify.com/api/token',
      body.toString(),
      { headers }
    );
  }
}
