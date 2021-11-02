import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  category: string;
  Message: string;
  service: string;
  business_id1: Number;
  business_id2: Number;
  business_id3: Number;
  template_url: any;
  template_name: string;
  business_category: [];

  constructor(private tokenStorage: TokenStorageService,
              private adminService: AdminService,
              private alertService: AlertService, 
              private router: Router) { }

  ngOnInit() {
    this.getCategory();
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.template_name = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.template_url = (event.target.result);
      }
    }
  }

  onSubmit(){
    this.adminService.addTemplate(this.template_url, this.template_name, this.business_id1).subscribe(
      data => {
        this.alertService.presentToast(data['msg'], 'success');
        this.template_url = ''
        document.querySelector('ion-input').value=''
        this.business_id1 = null;
      }
    )
  }

  addCategory() {
    this.adminService.addBusiness(this.category).subscribe(
      data => {
        this.alertService.presentToast(data['msg'], 'success');
        this.category =''
      }
    )
  }

  addMessage(){
    this.adminService.addMessage(1, this.business_id2, this.Message).subscribe(
      data => {
        this.alertService.presentToast(data['msg'], 'success');
        this.Message =''
        document.querySelector('ion-input').value=''
        this.business_id2 = null;
      }
    )
  }

  addService() {
    this.adminService.addService(1, this.business_id3, this.service).subscribe(
      data => {
        this.alertService.presentToast(data['msg'], 'success');
        this.service =''
        document.querySelector('ion-input').value=''
        this.business_id3 = null;
      }
    )
  }

  getCategory() {
    this.adminService.getCategory().subscribe(
      data=> {
        this.business_category = data['business'];
      }
    )
  }

  logout() {
    this.tokenStorage.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }
}
