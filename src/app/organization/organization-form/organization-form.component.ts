import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleFormComponent } from 'src/app/role/role-form/role-form.component';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {
  organizationForm!: FormGroup;
  roleSubmitSubscription!: Subscription;
  organization: any;
  organization_id: number;
 

  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private organizationService: OrganizationService
  ) {
    this.organization = data;
    console.log(data, this.organization)
    this.organization_id = data.organization_id;
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
        name: this.organization.organization['name'],
        city: this.organization.organization['city'],
        state: this.organization.organization['state'],
        country: this.organization.organization['country']
      });
    }
  }

  createOrganization(ngForm: NgForm) {
    if (this.organization_id == 0) {
      console.log(ngForm)
      this.roleSubmitSubscription = this.organizationService
        .orgAdd(ngForm)
        .subscribe((response) => {
          this.dialogRef.close();
          console.log(response)
        });
    } else {
      console.log(ngForm);
      this.roleSubmitSubscription = this.organizationService
        .orgUpdate(ngForm)
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
