import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { MaterialPackageModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationFormComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    MaterialPackageModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrganizationModule { }
