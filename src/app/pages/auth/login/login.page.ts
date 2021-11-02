import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  email: string = 'user@gmail.com'
  password: string = 'user123'
  showPassword=false
  loading = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private router: Router, 
              private authService: AuthService, 
              private tokenStorage: TokenStorageService, 
              private alertService: AlertService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()) {
      this.router.navigate(['/dashboard'])
    }
  }

  hideShowPassword() {
    this.passwordType=this.passwordType=='text'?'password':'text';
    this.passwordIcon=this.passwordIcon=='eye-off'?'eye':'eye-off';
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      data=>{
        this.alertService.presentToast(data.msg, 'success');
        this.tokenStorage.setToken(data.token);
        setTimeout(()=>{
          this.router.navigateByUrl('/dashboard', {replaceUrl: true});
        }, 1500)
      }
    )
    this.loading=false;
  }
}
