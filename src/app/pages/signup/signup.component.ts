import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone:true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule,RouterModule,RouterLink,HttpClientModule]
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  result = '';

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


    try {
      let result = await this.authenticationService.signup(
        this.signupForm.controls['email'].value ?? '',
        this.signupForm.controls['password'].value?? ''
      )
      if (result){
        alert("success")
      }
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    } catch (error) {
      alert("fail")
      console.log("signup button submit error,", error)
    }

  }

}
