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
  organization: number[] = [];
  organization_id: number;
  organization_name:string = "";
  organization_state:string = "";
  organization_country:string = "";
  organization_city:string = "";

  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private organizationService: OrganizationService
  ) {
    this.organization = data;
    this.organization_id = data.organization_id;
    this.organization_name = data.organization_name;
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
