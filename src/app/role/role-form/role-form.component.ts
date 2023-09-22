import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  roleForm!: FormGroup;
  modules = {};
  content = '';
  preview: string = '';
  loggedInUser!: number;
  roleSubmitSubscription!: Subscription;
  permissions = [];
  permission_list: number[] = [];
  checked_value!: number;
  role: number[] = [];
  role_id: number;
  permissions_come_from_api = [];
  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _cdr: ChangeDetectorRef,
  ) {
    this.permissions = data.permissions;
    this.role = data.role;
    this.role_id = data.role_id;
  }

  ngOnInit() {
    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      permission_list_field: new FormControl('', [Validators.required]),
      role_id: new FormControl(this.role_id)
    });
    if (this.role_id != 0) {
      this.permission_list = this.data.role;
      this.roleForm.patchValue({
        name: this.data.role_name,
        permission_list_field: JSON.stringify(this.data.role),
      });
    }
  }

  createRole(ngForm: NgForm) {
   
    // if (this.role_id == 0) {
    //   this.roleSubmitSubscription = this.roleService
    //     .roleCreate(ngForm)
    //     .subscribe((response) => {
    //       this.dialogRef.close();
    //       this._cdr.detectChanges();
    //       this.spinner.hide();
    //     });
    // } else {
    //   console.log(ngForm);
    //   this.roleSubmitSubscription = this.roleService
    //     .roleUpdate(ngForm)
    //     .subscribe((response) => {
    //       this.dialogRef.close();
    //       this._cdr.detectChanges();
    //       this.spinner.hide();
    //     });
    // }
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
      this.roleForm.patchValue({
        permission_list_field: JSON.stringify(this.permission_list),
      });
    } else {
      this.roleForm.patchValue({
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
