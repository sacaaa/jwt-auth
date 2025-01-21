import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const excludedPaths = [
        '/auth/login',
        '/auth/register',
        '/auth/refresh-token',
    ];

    const token = authService.getAccessToken();

    if (token && !excludedPaths.some((path) => req.url.includes(path))) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return next(req).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                const refreshToken = authService.getRefreshToken();

                if (!refreshToken) {
                    authService.logout();
                    return throwError(() => error);
                }

                return authService.refreshAccessToken().pipe(
                    switchMap((newAccessToken) => {
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                        });
                        return next(req);
                    }),
                    catchError(() => {
                        authService.logout();
                        return throwError(() => error);
                    }),
                );
            }

            return throwError(() => error);
        }),
    );
};
