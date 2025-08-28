import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notification-list',
    imports: [CommonModule],
    templateUrl: './notification-list.component.html',
    styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent {
    notifications: any;

    private notificationService = inject(NotificationService);

    ngOnInit(): void {
        this.notifications = this.notificationService.notifications;
        this.notificationService.startConnection();
        this.notificationService.listenForNotifications();
    }

    ngOnDestroy(): void {
        this.notificationService.stopConnection();
    }
}
