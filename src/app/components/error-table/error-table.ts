import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-table.html',
  styleUrls: ['./error-table.css']
})
export class ErrorTable {
  @Input() error$?: Observable<HttpErrorResponse>;
}
