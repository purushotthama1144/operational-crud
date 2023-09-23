import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialPackageModule } from '../material.module';


@NgModule({
  declarations: [
    BranchListComponent,
    BranchFormComponent,
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    MaterialPackageModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BranchModule { }
