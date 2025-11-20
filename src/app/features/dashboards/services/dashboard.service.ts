// dashboard.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    // Signal pour stocker la liste de tâches
    /* 
    tasks = c’est une boîte spéciale (signal) qui contient la liste de tes tâches.
    Quand tu ajoutes ou supprimes une tâche, Angular regarde cette boîte et met automatiquement à jour l’écran là où la liste est affichée.
    Signal = boîte magique qui prévient Angular quand quelque chose change.
   */
    tasks = signal<Task[]>(
        (JSON.parse(localStorage.getItem('tasks') || '[]') as any[]).map(t => ({
            ...t,
            timestamp: new Date(t.timestamp)
        }))
    );
    filter = signal('');
    isAdmin = signal(true);

    // signal modifiable
    title = signal<string>('Tasks (0)');

    constructor() {
        // Logs a chaque modification du signal tasks
        /*
        signal = une boîte magique
        effect = un observateur automatique
        À chaque fois que quelque chose change dans un des signaux utilisés dans l’effet, Angular relance la fonction.
         - Dès que tu ajoutes une tâche
         - Dès que tu en supprimes une
         - Dès que le minuteur en ajoute une
        Angular relance cette fonction.
        Pas besoin de subscribe, pas besoin d’unsubscribe, pas besoin de gestion RxJS → Angular gère tout.
        */
        // Log
        effect(() => console.log('Nombre de tâches :', this.tasks().length));

        // Sauvegarde locale
        effect(() => localStorage.setItem('tasks', JSON.stringify(this.tasks())));

        // Mise à jour du titre
        effect(() => this.title.set(`Tasks (${this.tasks().length})`));

        // Simuler envoi de stats
        effect(async () => {
            await new Promise(r => setTimeout(r, 100));
            console.log('Stats envoyées :', this.tasks().length);
        });
    }

    // Liste filtrée (computed)
    /*
    computed = une règle magique : dès que quelque chose change dans la boîte tasks ou filter, Angular refait le calcul tout seul.
    Ici, ça veut dire : “montre seulement les tâches qui contiennent ce que j’ai écrit dans le filtre”.
    Tu n’as rien à demander à Angular, il le fait automatiquement.
    */
    filteredTasks = computed(() =>
        this.tasks().filter(t => t.name.toLowerCase().includes(this.filter().toLowerCase()))
    );

}
