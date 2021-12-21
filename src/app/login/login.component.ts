import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required, Validators.required, Validators.minLength(5), Validators.maxLength(20)])
  })
  logined: boolean = false
  error: string = ""
  message: string = '';
  registered: boolean = false;
  loading: boolean = false;
  accountSubscription: any;
  submit() {
    this.loading = true;
    // let button = document.querySelector(".submit");
    if (this.loginForm.invalid) {
      return;
    }
    // button?.setAttribute("disabled", "true");
    this.accountSubscription = this._AuthService.signIn(this.loginForm.value).subscribe((res) => {
      this.loading = false;
      // button?.setAttribute("disabled", "false");
      if (res.message == 'success') {
        localStorage.setItem("user's Name", res.user.first_name)
        localStorage.setItem("Recipe Email", res.user.email)
        this.registered = false;
        this._Router.navigateByUrl('');
      }
      else {
        this.message = res.message;
        this.registered = true;
      }
    });
  }
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

}
