import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { Task } from '../../models/task';
import { DashboardService } from '../../services/dashboard.service';

Chart.register(...registerables); // Enregistre les éléments Chart.js

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements AfterViewInit {
  dashboard = inject(DashboardService);

  // Formulaire pour ajouter une tâche
  /*
  Le formulaire, c’est la feuille sur laquelle tu écris ta nouvelle tâche.
  Validators.required = tu dois écrire quelque chose sinon le formulaire ne sera pas valide.
  FormGroup = la feuille complète (ici, avec un seul champ “name”).
  FormBuilder = la machine qui crée la feuille pour toi facilement.
 */
  taskForm: FormGroup;

  // L’instance du graphique Chart.js
  chart!: Chart;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required]
    });

    // Simuler l’arrivée de tâches toutes les 5 secondes
    /*
    interval(5000) = un minuteur magique qui se déclenche toutes les 5 secondes.
    À chaque déclenchement, on crée une nouvelle tâche.
    On met la nouvelle tâche dans la boîte tasks → l’écran se met à jour automatiquement.
    */
    interval(5000).subscribe(() => {
      const simulatedTask = { name: `Tâche ${Math.floor(Math.random() * 100)}`, timestamp: new Date() };
      this.addSimulatedTask(simulatedTask);
    });
  }
  // INITIALISATION DU GRAPHIQUE
  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    const ctx = document.getElementById('tasksChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [], // temps
        datasets: [
          {
            label: 'Tâches créées',
            data: [],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    this.updateChart(); // afficher les tâches déjà présentes
  }

  // Ajouter une tâche
  /*
  On regarde si la feuille est correcte (taskForm.valid).
  On ouvre la boîte des tâches (tasks()), on ajoute la nouvelle tâche dedans.
  On ferme la boîte avec tasks.set(...) → Angular met automatiquement à jour la liste sur l’écran.
  On vide la feuille (taskForm.reset()) pour pouvoir ajouter une autre tâche.
  On remet à jour le graphique
💡Astuce :
    tasks() → lire ce qu’il y a dans la boîte.
    tasks.set(...) → mettre quelque chose dans la boîte.
 */
  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = { name: this.taskForm.value.name, timestamp: new Date() };
      this.dashboard.tasks.set([...this.dashboard.tasks(), newTask]);
      this.taskForm.reset();
      this.updateChart();
    }
  }

  // Ajouter tâche simulée
  // On remet à jour le graphique
  addSimulatedTask(task: Task) {
    this.dashboard.tasks.set([...this.dashboard.tasks(), task]);
    this.updateChart();
  }

  // Supprimer une tâche
  /* 
  On ouvre la boîte pour voir la liste.
  On enlève la tâche à l’index choisi (splice).
  On remet à jour la boîte avec la nouvelle liste → Angular met l’écran à jour.
  On remet à jour le graphique
 */
  removeTask(index: number) {
    if (!this.dashboard.isAdmin()) return;
    const current = this.dashboard.tasks();
    current.splice(index, 1);
    this.dashboard.tasks.set([...current]);
    this.updateChart();
  }

  // Met à jour les données du graphique
  updateChart() {
    if (!this.chart) return;

    const labels = this.dashboard.tasks().map(t =>
      t.timestamp.toLocaleTimeString()
    );
    const data = this.dashboard.tasks().map((_, i) => i + 1);

    // Mise à jour des données
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;

    this.chart.update();
  }

}
