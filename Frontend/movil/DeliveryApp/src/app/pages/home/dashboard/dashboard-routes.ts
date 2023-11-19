import { Route } from "@angular/router";
import { DashboardPage } from "./dashboard.page";

export default [
    {
        path: '',
        component: DashboardPage,
        children: [
            {
                path: 'carritos/:usuarioId',
                loadComponent: () => import('./components/carritos/carritos.component').then((m) => m.CarritosComponent)
            },
            {
                path: 'detalle-negocio/:negocioId',
                loadComponent: () => import('./components/detalle-negocio/detalle-negocio.component').then((m) => m.DetalleNegocioComponent)
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]
    },
] as Route[];