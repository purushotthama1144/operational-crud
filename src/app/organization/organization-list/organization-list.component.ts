import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoleFormComponent } from 'src/app/role/role-form/role-form.component';
import { OrganizationService } from '../organization.service';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations = [];
  role_count: number = -1;
  page: number = 1;
  permissions: string[] = [];

  roleListForm = new FormGroup({
    tenant_id: new FormControl(1),
    page: new FormControl(1),
  });

  constructor(
    private dialog: MatDialog,
    private _cdref: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    public router: Router,
    private organizationService : OrganizationService
  ) {}

  ngOnInit(): void {
    this.fetchList()
  }

  addOrganization(params: number) {
    const dilogRef = this.dialog.open(OrganizationFormComponent, {
      disableClose: true,
      data: {
        organization_id: params,
        organization: [],
        organization_name: '',
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  editRole(organization: string[], param: number, organization_name: string , 
    organization_state:string , 
    organization_country:string,
    organization_city:string) {
    console.log(organization)
    
    const dilogRef = this.dialog.open(OrganizationFormComponent, {
      disableClose: true,
      data: {
        organization_id: param,
        organization_name:organization_name,
        organization_state: organization_state,
        organization_country: organization_country,
        organization_city: organization_city,
        organization: organization,
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  fetchList() {
    this.organizationService.getOrganizationList().subscribe((data) => {
      console.log(data);
      this.organizations = [
        ...new Map(
          this.organizations.concat(data['results']).map((item) => [item['id'], item])
        ).values(),
      ];
      console.log(this.organizations)
      this.role_count = data['count'];
      this._cdref.detectChanges();
    });
    // this.organizationService.getOrganizationList().subscribe((data:any) => {
    //   console.log(data)
    // })
  }

}
