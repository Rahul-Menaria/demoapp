import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from '../../../services/tokenstorage.service'
import { AlertService } from '../../../services/alert.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
})
export class AddCustomerPage implements OnInit {
  user_id
  first_name: string;
  last_name: string;
  image_url: any;
  image_name: string;
  last_visit: Date;
  anniversary: Date;
  service: string;
  payment: Number;
  message: string;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private alertService: AlertService,
              private router: Router
             ) { }

  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    let user = this.tokenStorage.DecodeToken();
    this.user_id = user['user_id'];
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();
      this.image_name = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.image_url = (event.target.result);
      }
    }
  }

  onSubmit(data) {
    console.log(data)
    this.userService.addUser(this.user_id, data, this.image_url, this.image_name).subscribe(
      data => {
        this.alertService.presentToast(data['msg'], 'success');
        setTimeout(()=>{
          this.router.navigate(['/customer'])
        }, 1500)
      }
    )
  }
}
