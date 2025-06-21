import { Component }       from '@angular/core';
import { RouterModule }    from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.html',
  styleUrls:   ['./home.css']
})
export class Home {}
