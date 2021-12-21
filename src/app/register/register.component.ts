import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {



  registerForm: FormGroup = new FormGroup({
    "first_name": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    "last_name": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    "email": new FormControl(null, [Validators.email, Validators.required]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  })

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  registered: boolean = false;
  loading: boolean = false;
  accountSubscription: any;

  submit() {
    this.loading = true;
    if (this.registerForm.invalid) {
      return
    }
    this.accountSubscription = this._AuthService.signUp(this.registerForm.value).subscribe(response => {
      this.loading = false;
      if (response.message == "success") {
        this.registered = false
        this._Router.navigateByUrl("login")
      }
      else {
        this.registered = true
      }
    })
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.accountSubscription){
      this.accountSubscription.unsubscribe();
    }
  }
}
