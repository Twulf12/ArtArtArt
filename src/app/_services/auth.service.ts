import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user: User | null = null;

  constructor(private router: Router) {
    // var token = localStorage.getItem("token")
    // if (!token) {
    //   return
    // }
    // var parsed_token = this.parseJwt(token)
    // /* Example
    // {
    //   "Email": "tst123@email.com",
    //   "First_Name": "tst123",
    //   "Last_Name": "123",
    //   "Uid": "61e92bd91d323aeee27436f3",
    //   "exp": 1642757895,
    //   "iss": "Grandora user service"
    // }
    // */
    // // if (parsed_token.iss !== "Grandora user service") {
    // //   return
    // // }
    // if (Date.now() > parsed_token.exp * 1000) {
    //   // TODO maybe message/notify that session is expired
    //   return
    // }
    // this.user = new User;
    // for (var key in parsed_token) {
    //   if (this.user.hasOwnProperty(key.toLowerCase())) {
    //     this.user[key.toLowerCase()] = parsed_token[key];
    //   }
    // }
    // this.user = (parsed_token as User)
    // this.user.user_id = parsed_token.uid
    // this.user.token = token
  }


  async login(username: string, password: string): Promise<User> {
    try {
      console.log(`username:${username} password:${password}`)
      let user = await this._login(username, password)
      this.user = user
      localStorage.setItem("token", user.token)
      return user;
    } catch (error) {
      // console.log(error)
      throw error
    }
  }
  
  async _login(username: string, password: string): Promise<User> {
    try {
      throw new Error("not implemented");
      
      let user = new User
      // TODO: login logic, query db and check password 

      return user;
    } catch (error) {
      // console.log(error)
      throw error
    }
  }


  async logout(){
    try {
      localStorage.removeItem("token")
      this.user = null
    } catch (error){
      // console.log(error)
      throw error
    }
  }


}
