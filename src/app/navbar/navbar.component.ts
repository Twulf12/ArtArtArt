import { Component,inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../_services/auth.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[ RouterLink, RouterLinkActive,NgIf,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  private authService: AuthenticationService = inject(AuthenticationService)
  constructor(
    private router: Router,
  ){

  }
  isLoggedIn(){
    // console.log(this.authService.isLoggedIn())
    return this.authService.isLoggedIn()
  }
  Logout(){
    this.authService.user = null
    this.router.navigate(['/']);
  }
}
