import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert/alert.service';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    registerForm: FormGroup;
    formSubmitted = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
    ) {
        this.registerForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
                termsAndConditions: [false, Validators.requiredTrue],
            },
            { validators: this.passwordMatchValidator },
        );
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if (
            password &&
            confirmPassword &&
            password.value !== confirmPassword.value
        ) {
            return { passwordMismatch: true };
        }
        return null;
    }

    onRegister(event: Event): void {
        event.preventDefault();

        this.formSubmitted = true;
        if (!this.registerForm.valid) {
            this.alertService.addAlert('error', 'Invalid form submission!');
            return;
        }

        const { email, password } = this.registerForm.value;

        this.authService.register(email, password).subscribe({
            next: (response) => {
                console.log('Registration successful', response);
                this.alertService.addAlert(
                    'success',
                    'Registration successful!',
                );
                this.router.navigate(['/auth/login']);
            },
            error: (error) => {
                console.error('Registration failed', error);
                this.alertService.addAlert(
                    'error',
                    'Registration failed. Please try again.',
                );
            },
        });
    }
}
