import { Route } from "@angular/router";
import { AccesoPage } from "./acceso.page";
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";


export default [
    {path: 'login', component: LoginPage},
    {path: 'register', component: RegisterPage},
    {path: '', component: AccesoPage},
] as Route[];