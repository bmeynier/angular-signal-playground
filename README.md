# Angular Signal Playground

Demo Angular pour apprendre et expérimenter les **Signals**, **Computed**, **OnPush** et la **Change Detection**.

---

## 1. **Concept**

Ce projet illustre comment Angular moderne gère l’état avec les **signals**, un **dashboard dynamique** et une **UI réactive** :

- **Signals** : boîtes magiques qui préviennent Angular quand elles changent.
- **Computed** : règles magiques qui recalculent automatiquement les valeurs dérivées.
- **Effect** : observer automatique pour lancer du code à chaque changement d’un signal.
- **OnPush** : Angular met à jour uniquement les parties du template qui utilisent les signaux modifiés.

---

## 2. **Fonctionnalités**

1. **Dashboard dynamique de tâches**
   - Ajout, suppression et filtrage des tâches.
   - Tâches simulées toutes les 5 secondes.
   - Liste filtrée en temps réel avec computed signal.

2. **Formulaire simple avec Reactive Forms**
   - Validation `required`.
   - Ajout automatique dans la boîte `tasks`.

3. **Graphique Chart.js**
   - Affiche le nombre de tâches créées dans le temps.
   - Mise à jour automatique à chaque changement.

4. **Header dynamique**
   - Affiche le **titre du dashboard** avec signal.
   - Horloge en temps réel avec `ClockService`.

5. **Effets automatiques**
   - Logs des tâches dans la console.
   - Sauvegarde dans le `localStorage`.
   - Mise à jour du titre.
   - Simulation d’envoi de stats.

6. **Page README intégrée**
   - Explique le fonctionnement des signals, computed, template et OnPush.
   - Schéma ASCII du flux de données.

---

## 3. **Architecture**

- **Services**
  - `DashboardService` : signaux pour `tasks`, `filter`, `title`, `isAdmin`.
  - `ClockService` : signaux pour date et heure en temps réel.
  
- **Composants**
  - `HeaderComponent` : affiche le titre, la navigation et l’horloge.
  - `DashboardComponent` : formulaire, liste, chart et gestion des tâches.
  - `ReadmeComponent` : page statique avec explications et schéma ASCII.

- **Signals et Effects**
  - `tasks`: signal de la liste des tâches.
  - `filteredTasks`: computed pour le filtrage automatique.
  - Effets :
    - Console log des tâches.
    - Sauvegarde dans `localStorage`.
    - Mise à jour du titre.
    - Envoi de stats simulé.

- **Graph**
  - Chart.js line chart.
  - `updateChart()` recalcul automatique avec `tasks`.

---

## 4. **Installation et utilisation**

```bash
# Cloner le projet
git clone https://github.com/<ton-username>/angular-signal-playground.git
cd angular-signal-playground

# Installer les dépendances
npm install

# Lancer l'application
ng serve

