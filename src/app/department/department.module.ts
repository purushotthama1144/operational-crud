import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialPackageModule } from '../material.module';


@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MaterialPackageModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DepartmentModule { }
