import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from './models/alert';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private alerts: Alert[] = [];
    private alertsSubject = new BehaviorSubject<Alert[]>([]);
    alerts$ = this.alertsSubject.asObservable();

    private maxAlerts = 5;
    private alertId = 0;

    addAlert(type: 'success' | 'error' | 'info' | 'warning', message: string) {
        if (this.alerts.length >= this.maxAlerts) {
            this.alerts.shift();
        }

        const newAlert: Alert = {
            id: ++this.alertId,
            type,
            message,
        };

        this.alerts.push(newAlert);
        this.alertsSubject.next([...this.alerts]);

        setTimeout(() => this.removeAlert(newAlert.id), 5000);
    }

    removeAlert(id: number) {
        this.alerts = this.alerts.filter((alert) => alert.id !== id);
        this.alertsSubject.next([...this.alerts]);
    }
}
