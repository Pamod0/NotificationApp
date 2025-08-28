import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notification-sender',
    imports: [CommonModule, FormsModule],
    templateUrl: './notification-sender.component.html',
    styleUrl: './notification-sender.component.scss'
})
export class NotificationSenderComponent {
    message: string = '';

    private notificationService = inject(NotificationService);

    sendMessage() {
        if (this.message) {
            this.notificationService.sendNotificationToAll(this.message).subscribe({
                next: () => {
                    console.log('Message sent successfully to the API!');
                    this.message = ''; // Clear the input field
                },
                error: (err) => {
                    console.error('Error sending message:', err);
                }
            });
        }
    }
}
