import { HomePage } from "./home.page";
import { Route } from "@angular/router";
import { PedidosPage } from "./pedidos/pedidos.page";
import { DetallesPerfilComponent } from "./perfil/components/detalles-perfil/detalles-perfil.component";
import { CarritosComponent } from "./dashboard/components/carritos/carritos.component";
import { DetalleNegocioComponent } from "./dashboard/components/detalle-negocio/detalle-negocio.component";
import { ReporteComponent } from "./perfil/components/reporte/reporte.component";


export default [
    {
        path: '',
        component: HomePage,
        children: [
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routes')},
            { path: 'pedidos', component: PedidosPage},
            { path: 'perfil', loadChildren: () => import('./perfil/perfil-routes')},
            { path: 'detalles-perfil/:usuarioId', component: DetallesPerfilComponent},
            { path: 'reporte', component: ReporteComponent},
            { path: 'carritos/:usuarioId', component: CarritosComponent},
            { path: 'detalle-negocio/:negocioId', component: DetalleNegocioComponent},
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
        ] 
    },
] as Route[];
