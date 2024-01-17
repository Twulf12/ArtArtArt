import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../_services/auth.service';

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule,RouterModule,RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {

    // if (this.authenticationService.user) {
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
      await this.authenticationService.login(
        this.loginForm.controls['email'].value ?? '',
        this.loginForm.controls['password'].value?? ''
      )
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    } catch (error) {
      console.log("login button submit error,", error)
    }
  }

}
