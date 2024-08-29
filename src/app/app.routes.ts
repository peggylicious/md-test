import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'add-post',
        data: {
            title: 'add'
        },
        loadComponent: () => import('./shared/components/post-form/post-form.component').then((m) => m.PostFormComponent),
    },
    {
        path: 'edit-post/:id',
        data: {
            title: 'edit',
        },
        loadComponent: () => import('./shared/components/post-form/post-form.component').then((m) => m.PostFormComponent),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
