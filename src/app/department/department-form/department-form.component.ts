import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleFormComponent } from 'src/app/role/role-form/role-form.component';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  organizationForm!: FormGroup;
  modules = {};
  content = '';
  preview: string = '';
  loggedInUser!: number;
  roleSubmitSubscription!: Subscription;
  permissions = [];
  permission_list: number[] = [];
  checked_value!: number;
  role: number[] = [];
  organization_id: number;
  organization_name:string = "";
  organization_state:string = "";
  organization_country:string = "";
  organization_city:string = "";

  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _cdr: ChangeDetectorRef,
    private departmentService: DepartmentService
  ) {
    this.role = data;
    this.organization_id = data.organization_id;
    this.organization_name = data.organization_name;
    console.log(this.organization_name)
    this.organization_city = data.organization_city;
    this.organization_state = data.organization_state;
    this.organization_country = data.organization_country;
  }

  ngOnInit() {
    this.organizationForm = new FormGroup({
      organizationId: new FormControl(this.organization_id),
      name: new FormControl("", [Validators.required]),
      city:new FormControl("", [Validators.required]),
      state:new FormControl("", [Validators.required]),
      country:new FormControl("", [Validators.required]),
    });
    if (this.organization_id != 0) {
      this.organizationForm.patchValue({
        name: this.organization_name,
        city: this.organization_city,
        state: this.organization_state,
        country: this.organization_country
      });
    }
  }

  createOrganization(ngForm: NgForm) {
    if (this.organization_id == 0) {
      console.log(ngForm)
      this.roleSubmitSubscription = this.departmentService
        .departmentAdd(ngForm)
        .subscribe((response) => {
          this.dialogRef.close();
          console.log(response)
          this._cdr.detectChanges();
        });
    } else {
      console.log(ngForm);
      this.roleSubmitSubscription = this.departmentService
        .departmentUpdate(ngForm)
        .subscribe((response) => {
          console.log(response)
          this.dialogRef.close();
          this._cdr.detectChanges();
        });
    }
  }

  ngOnDestroy() {
    if (this.roleSubmitSubscription) {
      this.roleSubmitSubscription.unsubscribe();
    }
  }

  onChecklistWithInputBoxChange($event: Event) {
    this.checked_value = parseInt(($event.target as HTMLInputElement)['value']);
    if (($event.target as HTMLInputElement)['checked']) {
      this.permission_list.push(this.checked_value);
    } else {
      this.removeFromArray(this.permission_list, this.checked_value);
    }
  
    if (this.permission_list.length > 0) {
      this.organizationForm.patchValue({
        permission_list_field: JSON.stringify(this.permission_list),
      });
    } else {
      this.organizationForm.patchValue({
        permission_list_field: '',
      });
    }
  }
  removeFromArray(arr: any, checked_value: number) {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }
  checkboxCheckOrUnchecked(id: number) {
    if (this.role.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
