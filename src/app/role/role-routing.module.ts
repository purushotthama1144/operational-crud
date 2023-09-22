import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: RoleListComponent
  },
  {
    path: 'create',
    component: RoleFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoleRoutingModule { }
