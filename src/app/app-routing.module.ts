import { ClientComponent } from './pages/client/client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'clients', pathMatch: 'full'},
  {path: 'clients', component: ClientsComponent},
  {path: 'client', component: ClientComponent},
  {path: 'client/:identifier', component: ClientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
