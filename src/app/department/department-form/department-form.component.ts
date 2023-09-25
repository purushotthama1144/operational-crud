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
  departmentForm!: FormGroup;
  roleSubmitSubscription!: Subscription;
  organizationData:any;
  branchData:any;
  title:string = '';
  summary:string = "";
  photo:any;
  creatingUser:any;
  organization:any;
  branch:any;
  department_id: any;

  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

    private departmentService: DepartmentService
  ) {
    console.log(data)
    this.department_id = data.department_id;
  }

  ngOnInit() {
    this.organizationList();
    this.branchList();
    this.departmentForm = new FormGroup({
      title: new FormControl("" , [Validators.required]),
      summary: new FormControl(""),
      photo:new FormControl(""),
      creatingUser:new FormControl(1),
      organization:new FormControl(Number),
      branch:new FormControl(Number),
      department_id:new FormControl(1),
    });
    if (this.department_id != 0) {
      this.departmentForm.patchValue({
        title: this.data.department.department_title,
        summary: "",
        photo:"",
        creatingUser:1,
        organization:this.data.department.organization,
        branch:this.data.department.branch,
        department_id:1,
      });
    }
  }

  onchangeOrganization(event:any) {
    console.log(event.value)
  }
  onchangeBranch(event:any) {
    console.log(event.value)
  }

  organizationList() {
    this.departmentService.getOrganizationList().subscribe((data) =>  {
      this.organizationData = data.results;
   
    })
  }

  branchList() {
    const payload = {
      organization: 1
    }
    this.departmentService.getBranchList(payload).subscribe((data) =>  {
      this.branchData = data.results;
 
    })
  }

  createOrganization(ngForm: NgForm) {
    if (this.department_id == 0) {
      this.roleSubmitSubscription = this.departmentService
        .departmentAdd(ngForm)
        .subscribe((response) => {
          this.dialogRef.close();
          console.log(response)
        });
    } else {
      this.roleSubmitSubscription = this.departmentService
        .departmentUpdate(ngForm)
        .subscribe((response) => {
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
