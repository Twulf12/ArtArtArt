import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Server } from '../../_services/server.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterModule, RouterLink,HttpClientModule]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private server: Server
  ) {

    // if (this.server.user) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
  }

  async onSubmit() {


    // if (this.loginForm.invalid) {
    //   return;
    // }
    // this.submitted = true;

    // this.loading = true;

    try {
      await this.server.login(
        this.loginForm.controls['email'].value ?? '',
        this.loginForm.controls['password'].value ?? ''
      )
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    } catch (error) {
      // alert("incorrect user")
      console.log("login button submit error,", error)
    }
  }

}
