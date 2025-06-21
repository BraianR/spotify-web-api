import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { spotifyApiKeys } from '../api-secrets/spotify-api-keys';

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientCredentialsService {
  private readonly errorHandlerSubject = new Subject<HttpErrorResponse>();
  get errorHandler$(): Observable<HttpErrorResponse> {
    return this.errorHandlerSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  sendAuthRequest(): Observable<SpotifyAuthResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      Authorization:
        'Basic ' + btoa(`${spotifyApiKeys.CLIENT_ID}:${spotifyApiKeys.CLIENT_SECRET}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post<SpotifyAuthResponse>(
        'https://accounts.spotify.com/api/token',
        body.toString(),
        { headers }
      )
      .pipe(catchError(err => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    this.errorHandlerSubject.next(error);
    return throwError(() => new Error(error.message));
  }
}
