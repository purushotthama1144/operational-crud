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
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  editOrganization(organization: any) {
    const dilogRef = this.dialog.open(OrganizationFormComponent, {
      disableClose: true,
      data: {
        organization,
        organization_id: organization.id
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  deleteOrganization(organizationId:number) {
    console.log(organizationId)
    this.organizationService.orgDelete(organizationId).subscribe((data) => {
      console.log(data)
      if(data){
        this.fetchList()
      }
    })
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
  }

}
