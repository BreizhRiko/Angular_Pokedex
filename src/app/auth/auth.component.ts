import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthPost } from '../model/authPost';
import { empty } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit{
  authOk : boolean = false;

  loginForm!: FormGroup;
  message!: string;

  reponsePost!: AuthPost;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  /**
   * logout on init
   */
  ngOnInit(): void {
    localStorage.setItem('acces',"false");
    localStorage.setItem('acces_token',"");
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Authentication management via API postman
   */
  submitForm(): void {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(email, password).subscribe({
      next: (reponsePost: AuthPost) => {
        this.reponsePost = reponsePost;

        localStorage.setItem('acces_token',reponsePost.access_token);
        localStorage.setItem('acces',"true");
        this.authOk = true;
        this.router.navigate(['pokedex']);
      }
    });
  }

}
