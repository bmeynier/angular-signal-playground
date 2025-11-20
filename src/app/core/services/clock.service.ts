import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  now = signal(new Date());

  constructor() {
    setInterval(() => this.now.set(new Date()), 1000);
  }

  get date() {
    return this.now().toLocaleDateString('fr-FR');
  }

  get time() {
    return this.now().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
