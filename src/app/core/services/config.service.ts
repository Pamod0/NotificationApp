import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config: any;

    loadConfig(): Promise<void> {
        return fetch('/config.json')
            .then((res) => res.json())
            .then((cfg) => {
                this.config = cfg;
            })
            .catch((err) => {
                console.error('Failed to load config.json', err);
                throw err;
            });
    }

    get(key: string) {
        return this.config?.[key];
    }
}
