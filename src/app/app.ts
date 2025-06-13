import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientCredentialsService } from './client-credentials';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected title = 'spotify-web-api';

  constructor(private clientCredentials: ClientCredentialsService) {
    this.clientCredentials.sendAuthRequest().subscribe(res => {
      console.log('Token:', res.access_token);
    });
  }
}
