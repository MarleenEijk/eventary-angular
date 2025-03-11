import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { StorageComponent } from "./storage/storage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, StorageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eventary-angular';
}