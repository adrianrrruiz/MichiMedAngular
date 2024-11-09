import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { DashboardComponent } from './pages/panel/dashboard/dashboard.component';
import { MascotasComponent } from './pages/panel/mascotas/mascotas.component';
import { ClientesComponent } from './pages/panel/clientes/clientes.component';
import { DrogasComponent } from './pages/panel/drogas/drogas.component';
import { HistorialMedicoComponent } from './pages/panel/historial-medico/historial-medico.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorComponent } from './pages/error/error.component';
import { CalculadoraPesoComponent } from './pages/calculadora-peso/calculadora-peso.component';
import { VeterinariosComponent } from './pages/panel/veterinarios/veterinarios.component';
import { SuministrarTratamientosComponent } from './pages/panel/suministrar-tratamientos/suministrar-tratamientos.component';
import { TiendaComponent } from './pages/tienda/tienda.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/veterinarios', component: VeterinariosComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'mascotas', component: MascotasComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'drogas', component: DrogasComponent, canActivate: [AuthGuard] },
  { path: 'historial-medico', component: HistorialMedicoComponent, canActivate: [AuthGuard] },
  { path: 'historial-medico/:id', component: HistorialMedicoComponent, canActivate: [AuthGuard] },
  { path: 'suministrar-tratamiento', component: SuministrarTratamientosComponent, canActivate: [AuthGuard] },
  { path: 'calculadora-peso', component: CalculadoraPesoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: '', component: LandingComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
