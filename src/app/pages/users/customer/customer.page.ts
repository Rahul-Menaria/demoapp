import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from '../../../services/tokenstorage.service';
import { Router } from '@angular/router';
import { getLocaleDateFormat, getLocaleTimeFormat } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  name: string;
  id: number;
  customers:[];
  customersData:[];

  constructor(private tokenStorage: TokenStorageService, 
              private userService: UserService,
              private alertService: AlertService, 
              private router: Router ) { }

  ngOnInit() {
    this.getUserData();
    this.getUsers();
  }

  // getAnniversary() {
  //   let date: Date = new Date('UTC');
  //   let currentDay = date.getDay();
  //   let currentMonth = date.getMonth();
  //   // let currentDay = 14;
  //   // let currentMonth = 8;
  //   this.customers.forEach(customer => {
  //     let customer_anniversary = customer.anniversary.split('-');
  //     if((currentDay == customer_anniversary[2]) && (currentMonth == customer_anniversary[1])) {
  //       this.alertService.presentToast(`Congratulations ${customer.first_name+' '+customer.last_name} has completed a year with us`, 'success');
  //     }
  //   });
  // }

  getUserData() {
    let user = this.tokenStorage.DecodeToken();
    this.name = user['username'];
    this.id = user['user_id'];
  }

  async getUsers() {
    await this.userService.getUsers(this.id).subscribe(
      data => {
        this.customers = data['customer']
        // this.getAnniversary()
      }
    )
  }

  Search(value) {
    value = value.toLowerCase();
    if(value == '') {
      this.getUsers();
    }
    let copyCustomers = this.customers;
    this.customers = [];
    copyCustomers.forEach(element => {
      let name = (element['first_name']+' '+element['last_name']).toLowerCase();
      if(name.indexOf(value)!=-1) {
        this.customers.push(element)
      }
    });
  }

  onClear() {
    this.getUsers()
  }

  select(customer) {
    this.router.navigate(['/profile'])
    this.userService.addCusomerToStorage(JSON.stringify(customer));
  }
  
  add() {
    this.router.navigateByUrl('/add-customer', {state:{id:this.id}})
  }
}
