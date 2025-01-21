import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthResponse } from './models/auth-response.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly baseUrl = 'http://localhost:8080/api/auth';

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    login(
        email: string,
        password: string,
        rememberMe: boolean,
    ): Observable<any> {
        return new Observable((observer) => {
            this.http
                .post<AuthResponse>(`${this.baseUrl}/login`, {
                    email,
                    password,
                })
                .subscribe({
                    next: (response: AuthResponse) => {
                        this.storeTokens(response, rememberMe);
                        observer.next(response);
                        observer.complete();
                    },
                    error: (error) => observer.error(error),
                });
        });
    }

    register(email: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, { email, password });
    }

    logout(): void {
        this.clearTokens();
        this.router.navigate(['/auth/login']);
    }

    refreshAccessToken(): Observable<string> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('No refresh token available'));
        }

        return this.http
            .post<{
                accessToken: string;
            }>(`${this.baseUrl}/refresh-token`, { refreshToken })
            .pipe(
                map((response) => {
                    this.storeAccessToken(response.accessToken);
                    return response.accessToken;
                }),
                catchError((error) => {
                    this.logout();
                    return throwError(() => error);
                }),
            );
    }

    storeTokens(tokens: AuthResponse, rememberMe: boolean): void {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('accessToken', tokens.accessToken);
        storage.setItem('refreshToken', tokens.refreshToken);
    }

    storeAccessToken(accessToken: string): void {
        const storage = localStorage.getItem('refreshToken')
            ? localStorage
            : sessionStorage;
        storage.setItem('accessToken', accessToken);
    }

    getAccessToken(): string | null {
        return (
            localStorage.getItem('accessToken') ||
            sessionStorage.getItem('accessToken')
        );
    }

    getRefreshToken(): string | null {
        return (
            localStorage.getItem('refreshToken') ||
            sessionStorage.getItem('refreshToken')
        );
    }

    clearTokens(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }

    isLoggedIn(): boolean {
        return !!this.getAccessToken();
    }

    getIdFromToken(): number | null {
        const token = this.getAccessToken();

        if (!token) {
            return null;
        }

        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        const parsedPayload = JSON.parse(decodedPayload);
        return parsedPayload.id || null;
    }
}
