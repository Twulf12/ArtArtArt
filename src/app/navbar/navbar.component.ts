import { Component,inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Server } from '../_services/server.service';
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
  private server: Server = inject(Server)
  constructor(
    private router: Router,
  ){

  }
  isLoggedIn(){
    // console.log(this.server.isLoggedIn())
    return this.server.isLoggedIn()
  }
  Logout(){
    this.server.user = null
    this.router.navigate(['/']);
  }
}
