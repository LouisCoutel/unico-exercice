import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RoundTable } from './components/table/table';


@Component({
  selector: 'app-root',
  imports: [RoundTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('unico');
}
