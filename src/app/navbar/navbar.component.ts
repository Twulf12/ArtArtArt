import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../_services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[ RouterLink, RouterLinkActive,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  constructor(
    private router: Router,
    private authService: AuthenticationService    
  ){

  }
  isLoggedIn(){
    console.log(this.authService.isLoggedIn())
    return this.authService.isLoggedIn()
  }
  Logout(){
    this.authService.user = null
    this.router.navigate(['/']);
  }
}
