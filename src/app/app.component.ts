import { Component } from '@angular/core';
import { TokenStorageService } from './services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private tokenStorage: TokenStorageService) {}

  logout() {
    this.tokenStorage.logout();
  }
}
