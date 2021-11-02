import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service'
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  user_id: Number;
  business_id: Number;
  services: [];
  messages: [];
  service: string;
  message: string;

  constructor(private tokenStorage: TokenStorageService,
              private userService: UserService,
              private alertServie: AlertService
             ) { }

  ngOnInit() {
    this.getUser();
    this.getService();
    this.getMessage();
  }

  getUser() {
    let user = this.tokenStorage.DecodeToken();
    this.user_id = user['user_id'];
    this.business_id = user['business_id']
  }

  show(content) {
    document.getElementById(content).style.display = 'block';
  }

  async getService() {
    console.log(this.user_id)
    await this.userService.getService(this.user_id).subscribe(
      data => {
        this.services = data['service'];
      }
    )
  }

  addService() {
    this.userService.addService(this.user_id, this.business_id, this.service).subscribe(
      async data=> {
        this.alertServie.presentToast(data['msg'], 'success')
        this.service = '';
        document.getElementById('service').style.display = 'none';
        await this.getService()
      }
    )
  }
  
  deleteService(data) {
    this.userService.deleteService(data).subscribe(
      async data => {
        this.alertServie.presentToast(data['msg'], 'success')
        await this.getService();
      }
    )
  }

  async getMessage() {
    await this.userService.getMessage(this.user_id).subscribe(
      data => {
        this.messages = data['message'];
      }
    )
  }

  addMessage() {
    this.userService.addMessage(this.user_id, this.business_id, this.message).subscribe(
      async data => {
        this.alertServie.presentToast(data['msg'], 'success')
        this.message = '';
        document.getElementById('message').style.display = 'none';
        await this.getMessage()
      }
    )
  }

  async deleteMessage(data) {
    await this.userService.deleteMessage(data).subscribe(
      data => {
        this.alertServie.presentToast(data['msg'], 'success')
        this.getMessage();
      }
    )
  }
}
