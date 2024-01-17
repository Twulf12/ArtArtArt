import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../_services/auth.service';

@Component({
  standalone:true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule,RouterModule,RouterLink]
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


    // if (this.signupForm.invalid) {
    //   return;
    // }
    // this.submitted = true;

    // this.loading = true;

    // try {
    //   await this.authenticationService.signup(
    //     this.signupForm.controls['email'].value ?? '',
    //     this.signupForm.controls['password'].value?? ''
    //   )
    //   const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //   this.router.navigateByUrl(returnUrl);
    // } catch (error) {
    //   console.log("signup button submit error,", error)
    // }

  }

}
