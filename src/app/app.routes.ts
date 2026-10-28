import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home | Gym Leader Registry',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'leaders',
    title: 'Gym Leaders | Registry',
    loadComponent: () => import('./components/leader-list/leader-list').then(m => m.LeaderList)
  },
  {
    path: 'leaders/new',
    title: 'Add Leader | Registry',
    loadComponent: () => import('./components/leader-form/leader-form').then(m => m.LeaderForm)
  },
  {
    path: 'leaders/:id/edit',
    title: 'Edit Leader | Registry',
    loadComponent: () => import('./components/leader-form/leader-form').then(m => m.LeaderForm)
  },
  { path: '**', component: NotFound, title: 'Page Not Found' }
];
