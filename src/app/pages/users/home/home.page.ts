import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  templates
  username: string;
  user_id: Number;
  temp: string;
  
  constructor(private tokenStorage: TokenStorageService,
              private userService: UserService,
              private router: Router
              ) { }
  
  
  ngOnInit() {
    this.getTemplates()
    this.getUser();
  }

  getUser() {
    let user = this.tokenStorage.DecodeToken();
    this.username = user['username'];
    this.user_id = user['user_id']
  }

  edit(value) {
    this.userService.addImageToStorage(value);
    this.router.navigate(['/editimage']);
  }

  async getTemplates() {
    await this.userService.getTemplate().subscribe(
      data => {
        this.templates = data['template']
      }
    )
  }
}
