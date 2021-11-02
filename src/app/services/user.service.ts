import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private http: HttpClient, 
              private envservice: EnvService) { }

  getUsers(id) {
    return this.http.post(this.envservice.API_URL+`/users/${id}`, this.httpOptions);
  }

  addUser(user_id, data, image_url, image_name) {
    return this.http.post(this.envservice.API_URL+'/users/add/customer', {user_id, data, image_url, image_name}, this.httpOptions);
  }

  getTemplate() {
    return this.http.get(this.envservice.API_URL+'/template', this.httpOptions);
  }

  getEditedTemplate(user_id) {
    return this.http.post(this.envservice.API_URL+'/edited_template/getEditedTemplate',{ user_id }, this.httpOptions);
  }

  getService(user_id) {
    return this.http.post(this.envservice.API_URL+'/service/getService', {user_id}, this.httpOptions);
  }

  addService(user_id, business_id, service_data) {
   return this.http.post(this.envservice.API_URL+'/service/addService', {user_id, business_id, service_data}, this.httpOptions);
  }

  deleteService(id) {
    return this.http.delete(this.envservice.API_URL+`/service/deleteService/${id}`);
  }
  
  getMessage(user_id) {
    return this.http.post(this.envservice.API_URL+'/text_template/getMessage', {user_id}, this.httpOptions);
  }

  getAllMessage(user_id, business_id) {
    return this.http.post(this.envservice.API_URL+'/text_template/getAllMessage',{user_id, business_id}, this.httpOptions);
  }

  addMessage(user_id, business_id ,text_data) {
    return this.http.post(this.envservice.API_URL+'/text_template/addMessage', {user_id, business_id, text_data}, this.httpOptions);
  }

  deleteMessage(id){
    return this.http.delete(this.envservice.API_URL+`/text_template/deleteMessage/${id}`);
  }

  saveEditedImage(url, user_id) {
    return this.http.post(this.envservice.API_URL+'/edited_template/add_edited_template', {url, user_id}, this.httpOptions);
  }

  updateProfile(customer_id, service, payment, last_visit){
    return this.http.post(this.envservice.API_URL+'/users/update/profile', {customer_id, service, payment, last_visit}, this.httpOptions);
  }

  editProfile(customer_data_id, customer_id, service, payment, last_visit){
    return this.http.put(this.envservice.API_URL+'/users/edit/profile', {customer_data_id, customer_id, service, payment, last_visit}, this.httpOptions);
  }

  getGraphData(customer_id) {
    return this.http.post(this.envservice.API_URL+'/users/getGraph/Data', {customer_id}, this.httpOptions);
  }

  public addImageToStorage(url: string): void{
    localStorage.setItem('image', url);
  }

  public getImageFromStorage() : string | null {
    return localStorage.getItem('image');
  }

  public remove(data){
    localStorage.removeItem(data);
  }

  public addCusomerToStorage(customer): void {
    localStorage.setItem('customer', customer);
  }

  public getCustomerFromStorage() : string | null{
    return localStorage.getItem('customer');
  }
}