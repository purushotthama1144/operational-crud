import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleFormComponent } from 'src/app/role/role-form/role-form.component';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {
  branchForm!: FormGroup;
  modules = {};
  content = '';
  preview: string = '';
  loggedInUser!: number;
  roleSubmitSubscription!: Subscription;
  permissions = [];
  permission_list: number[] = [];
  checked_value!: number;
  role: number[] = [];
  branch_id: number;
  branch_name:string = "";
  branch_state:string = "";
  branch_country:string = "";
  branch_city:string = "";

  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _cdr: ChangeDetectorRef,
    private branchService: BranchService
  ) {
    this.role = data;
    this.branch_id = data.branch_id;
    this.branch_name = data.branch_name;
    console.log(this.branch_name)
    this.branch_city = data.branch_city;
    this.branch_state = data.branch_state;
    this.branch_country = data.branch_country;
  }

  ngOnInit() {
    this.branchForm = new FormGroup({
      organization: new FormControl(1),
      branchId: new FormControl(1),
      branchCode: new FormControl(1),
      name: new FormControl("", [Validators.required]),
      city:new FormControl("", [Validators.required]),
      state:new FormControl("", [Validators.required]),
      country:new FormControl("", [Validators.required]),
    });
    if (this.branch_id != 0) {
      this.branchForm.patchValue({
        name: this.branch_name,
        city: this.branch_city,
        state: this.branch_state,
        country: this.branch_country
      });
    }
  }

  createBranch(ngForm: NgForm) {
    if (this.branch_id == 0) {
      console.log(ngForm)
      this.roleSubmitSubscription = this.branchService
        .branchAdd(ngForm)
        .subscribe((response) => {
          this.dialogRef.close();
          console.log(response)
          this._cdr.detectChanges();
        });
    } else {
      console.log(ngForm);
      this.roleSubmitSubscription = this.branchService
        .branchUpdate(ngForm)
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
      this.branchForm.patchValue({
        permission_list_field: JSON.stringify(this.permission_list),
      });
    } else {
      this.branchForm.patchValue({
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
