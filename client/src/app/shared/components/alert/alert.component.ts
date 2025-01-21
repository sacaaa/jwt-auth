import { Component } from '@angular/core';
import { AlertService } from '../../../services/alert/alert.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
    alerts$;

    constructor(private alertService: AlertService) {
        this.alerts$ = this.alertService.alerts$;
    }

    closeAlert(id: number) {
        this.alertService.removeAlert(id);
    }
}
