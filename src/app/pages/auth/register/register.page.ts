import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth.service'
import { AlertService } from '../../../services/alert.service'
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  username: string = 'Anshul Sharma';
  email: string = 'anshulsharma@gmail.com'
  password: string = 'anshul123'
  business_id: Number;
  category: [];
  loading = false;
  submitted = false
  showPassword = false
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  
  constructor(private authService: AuthService, 
              private router: Router, 
              private alertService: AlertService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.getCategory()
  }

  hideShowPassword() {
    this.passwordType=this.passwordType=='text'?'password':'text';
    this.passwordIcon=this.passwordIcon=='eye-off'?'eye':'eye-off';
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.authService.register(this.username, this.email, this.password, this.business_id).subscribe(
      data=>{
        this.alertService.presentToast(data.msg, 'success');
        setTimeout(()=>{
          this.router.navigate(['/login']);
        }, 2000)
      }
    )
    this.loading=false
  }

  getCategory() {
    this.adminService.getCategory().subscribe(
      data => {
        this.category = data['business']
      }
    )
  }
}
