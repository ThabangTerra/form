import { Component, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { MainContent } from "./main-content/main-content";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar,CommonModule, RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('forms-app');
}
