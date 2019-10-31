import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'restaurantes', loadChildren: './restaurantes/restaurantes.module#RestaurantesPageModule' },
  { path: 'vivero', loadChildren: './vivero/vivero.module#ViveroPageModule' },
  { path: 'eventos', loadChildren: './eventos/eventos.module#EventosPageModule' },
  { path: 'institucional', loadChildren: './institucional/institucional.module#InstitucionalPageModule' },
  { path: 'tarifas-horarios', loadChildren: './tarifas-horarios/tarifas-horarios.module#TarifasHorariosPageModule' },
  { path: 'parqueadero', loadChildren: './parqueadero/parqueadero.module#ParqueaderoPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
