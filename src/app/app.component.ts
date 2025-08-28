import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationListComponent } from './core/components/notification-list/notification-list.component';
import { NotificationSenderComponent } from "./core/components/notification-sender/notification-sender.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NotificationListComponent, NotificationSenderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'NotificationApp';
}
