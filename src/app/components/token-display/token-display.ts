import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ClientCredentialsService } from '../../client-credentials';

@Component({
  selector: 'app-token-display',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './token-display.html',
  styleUrls: ['./token-display.css']
})
export class TokenDisplay {
  accessToken = '';
  expiresIn = 0;
  tokenType = '';

  constructor(private authService: ClientCredentialsService) {
    this.authService.sendAuthRequest().subscribe(res => {
      this.accessToken = res.access_token;
      this.expiresIn = res.expires_in;
      this.tokenType = res.token_type;
    });
  }
}
