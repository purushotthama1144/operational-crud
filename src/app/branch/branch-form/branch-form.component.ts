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
  loggedInUser!: number;
  roleSubmitSubscription!: Subscription;
  organizationData:any;
  Organization:any;
  branchName:any;
  branchId:any;
  branchCode:any;
  City:any;
  State:any;
  Country:any;

  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private branchService: BranchService
  ) {
    if(data.id == 0) {
      this.branchId = data.id
    } else {
      this.Organization = data.branch.organization;
      this.branchName = data.branch.branch_name
      this.branchId = data.branch.id
      this.branchCode = data.branch.branch_code
      this.City = data.branch.city
      this.State = data.branch.state
      this.Country = data.branch.country

    }
    console.log(data)
  }

  ngOnInit() {
    this.organizationList();
    this.branchForm = new FormGroup({
      organization: new FormControl(Number),
      branch_name: new FormControl("", [Validators.required]),
      branch_id: new FormControl(Number),
      branch_code: new FormControl(Number),
      city:new FormControl("", [Validators.required]),
      state:new FormControl("", [Validators.required]),
      country:new FormControl("", [Validators.required]),
    });
    if (this.branchId != 0) {
      this.branchForm.patchValue({
        organization: this.Organization,
        branch_name: this.branchName,
        branch_id: this.branchId,
        branch_code:this.branchCode,
        city: this.City,
        state: this.State,
        country:this.Country,
      });
    }
  }

  organizationList() {
    this.branchService.getOrganizationList().subscribe((data) =>  {
      this.organizationData = data.results;
      
      console.log(data)
    })
  }

  onchangeOrganization(event:any) {
    console.log(event.value)
    if(this.branchId == 0) {
        this.branchForm.controls['branch_name'].reset();
        this.branchForm.controls['city'].reset();
        this.branchForm.controls['state'].reset();
        this.branchForm.controls['country'].reset();
    }
  }

  createBranch(ngForm: NgForm) {
    console.log(ngForm)
    if (this.branchId == 0) {

      this.roleSubmitSubscription = this.branchService
        .branchAdd(ngForm)
        .subscribe((response) => {
          this.dialogRef.close();
          console.log(response)
        });
    } else {
      this.roleSubmitSubscription = this.branchService
        .branchUpdate(ngForm)
        .subscribe((response) => {
          console.log(response)
          this.dialogRef.close();
        });
    }
  }

  ngOnDestroy() {
    if (this.roleSubmitSubscription) {
      this.roleSubmitSubscription.unsubscribe();
    }
  }
}