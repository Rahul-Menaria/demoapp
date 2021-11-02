import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-myedit',
  templateUrl: './myedit.page.html',
  styleUrls: ['./myedit.page.scss'],
})
export class MyeditPage implements OnInit {

  user_id: Number;
  templates

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.getUser();
    this.getTemplates();
  }

  getUser() {
    let user = this.tokenStorage.DecodeToken();
    this.user_id = user['user_id'];
  }

  async getTemplates() {
    await this.userService.getEditedTemplate(this.user_id).subscribe(
      data => {
        this.templates = data['template'];
      }
    )
  }

}
