import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit{
  hide = true;
  loginForm!: FormGroup;
  message!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    if (this.authService.login(email, password)) {
      this.router.navigate(['pokedex']);
    } else {
      this.message = 'Le nom d\'utilisateur ou le mot de passe est incorrect.';
    }
  }
}
