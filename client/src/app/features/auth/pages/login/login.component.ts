import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { AuthResponse } from '../../../../services/auth/models/auth-response.model';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert/alert.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    loginForm: FormGroup;
    formSubmitted = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false],
        });
    }

    onLogin(event: Event): void {
        event.preventDefault();

        this.formSubmitted = true;
        if (!this.loginForm.valid) {
            this.alertService.addAlert('error', 'Invalid form submission!');
            return;
        }

        const { email, password, rememberMe } = this.loginForm.value;

        this.authService.login(email, password, rememberMe).subscribe({
            next: (response: AuthResponse) => {
                console.log('Login successful', response);
                this.alertService.addAlert('success', 'Login successful!');
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Login failed', error);
                this.alertService.addAlert(
                    'error',
                    'Login failed. Please try again.',
                );
            },
        });
    }
}
