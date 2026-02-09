import { AuthService } from '@/auth/services/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage { 

  fb = inject(FormBuilder)
  hasError = signal(false);
  isPosting = signal(false);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
  })

  onSubmit(){
    if(this.registerForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return
    }
    const { email = '', password = '', fullName = '' } = this.registerForm.value;
    this.authService.register(email!, password!, fullName!).subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return
    })
  }
}
