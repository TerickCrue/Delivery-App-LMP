import { Route} from "@angular/router";
import { PerfilPage } from "./perfil.page";

export default [
    {
        path: '',
        component: PerfilPage,
        children: [
            {
                path: 'detalles-perfil/:usuarioId',
                loadComponent: () => import('./components/detalles-perfil/detalles-perfil.component').then((m) => m.DetallesPerfilComponent)
            },
            //{ path: '**', redirectTo: '', pathMatch: 'full'}
        ]
    },
] as Route[];