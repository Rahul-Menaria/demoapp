import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common'
import * as htmlToImage from 'html-to-image';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'
import { AlertService } from 'src/app/services/alert.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-editimage',
  templateUrl: './editimage.page.html',
  styleUrls: ['./editimage.page.scss'],
})
export class EditimagePage implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  image_url: any;
  user_id: Number;
  business_id: Number;
  edited_image_url: any;
  templates: [];

  constructor(private location:Location,
              private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private tokenStorage: TokenStorageService
             ){ }

  ngOnInit() {
    this.getImage();
    this.getUser();
    this.getAllMessaage();
  }

  getImage(){
    this.image_url = this.userService.getImageFromStorage();
  }

  getUser() {
    let user = this.tokenStorage.DecodeToken();
    this.user_id = user['user_id'];
    this.business_id = user['business_id']
  }

  getAllMessaage() {
    this.userService.getAllMessage(this.user_id, this.business_id).subscribe(
      data=> {
        this.templates = data['message'];
      }
    )
  }

  clear() {
    document.getElementById('defaultText').style.display = 'none';
    document.getElementById('select').style.display = 'none';
  }
  
  onSelect() {
    document.getElementById('defaultText').style.display = 'none';
  }
      
  downloadImage(){
    let image = document.getElementById("image");
    htmlToImage.toCanvas(image).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'image.png';
      this.downloadLink.nativeElement.click();
      this.userService.saveEditedImage(canvas.toDataURL(), this.user_id).subscribe( data => {
        this.alertService.presentToast(data['msg'], 'success');
        this.router.navigate(['/home']);
      })
    });
  }

  ngOnDestroy(){
    this.userService.remove('image');
  }
}