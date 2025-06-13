import { Component } from '@angular/core';
import { TokenDisplay } from './components/token-display/token-display';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TokenDisplay],
  template: `<app-token-display></app-token-display>`
})
export class App {}
