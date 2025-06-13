import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ClientCredentialsService } from '../../client-credentials';
import { ErrorTable } from '../error-table/error-table';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-token-display',
  standalone: true,
  imports: [CommonModule, MatCardModule, ErrorTable],
  templateUrl: './token-display.html',
  styleUrls: ['./token-display.css']
})
export class TokenDisplay {
  accessToken = '';
  expiresIn = 0;
  tokenType = '';

  errorHandler$: Observable<HttpErrorResponse>;

  constructor(private authService: ClientCredentialsService) {
    this.errorHandler$ = this.authService.errorHandler$;

    this.authService.sendAuthRequest().subscribe({
      next: res => {
        this.accessToken = res.access_token;
        this.expiresIn = res.expires_in;
        this.tokenType = res.token_type;
      },
      error: () => {
      }
    });
  }
}
