import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private hubConnection!: HubConnection;
    public notifications = signal<string[]>([]);
    private hubUrl = 'https://localhost:44354/notificationHub'; // Replace with your backend URL
    private apiUrl = 'https://localhost:44354/api/Notification'; // Base API URL

    private http = inject(HttpClient);

    public startConnection = () => {
        this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl).withAutomaticReconnect().build();

        this.hubConnection
            .start()
            .then(() => console.log('SignalR Connection started'))
            .catch((err) => console.log('Error while starting connection: ' + err));

        this.hubConnection.onclose((err) => {
            console.log('SignalR Connection closed: ', err);
        });

        this.hubConnection.onreconnected(() => {
            console.log('SignalR Reconnected successfully!');
        });

        this.hubConnection.onreconnecting((err) => {
            console.log('SignalR Reconnecting... ', err);
        });
    };

    public listenForNotifications = () => {
        // The "ReceiveNotification" string must match the method name on your C# hub.
        this.hubConnection.on('ReceiveNotification', (message: string) => {
            console.log('Notification received:', message);
            // Use the Signal function to update the array
            this.notifications.update((messages) => [...messages, message]);
        });
    };

    public stopConnection = () => {
        this.hubConnection.stop();
    };

    public sendNotificationToAll(message: string) {
        const url = `${this.apiUrl}/send-to-all`;
        // The body of the request is the string message.
        return this.http.post(url, JSON.stringify(message), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
