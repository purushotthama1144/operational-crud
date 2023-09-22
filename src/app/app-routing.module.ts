import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  { path: 'organization', loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
