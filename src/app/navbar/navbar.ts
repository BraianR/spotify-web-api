import { Component }      from '@angular/core';
import { RouterModule }   from '@angular/router';
import { MatIconModule }  from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrls:   ['./navbar.css']
})
export class Navbar {}
