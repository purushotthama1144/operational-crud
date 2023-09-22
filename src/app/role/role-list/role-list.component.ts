import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoleFormComponent } from '../role-form/role-form.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles = [];
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
  ) {}

  ngOnInit(): void {

  }

  addRole(params: number) {
    const dilogRef = this.dialog.open(RoleFormComponent, {
      disableClose: true,
      data: {
        permissions: this.permissions,
        role_id: params,
        role: [],
        role_name: '',
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
    
    });
  }

  editRole(role: string[], param: number, role_name: string) {
    const permission_arr = JSON.parse(JSON.stringify(role))['permissions'];
    let permission_list_from_database = [];
    for (let per of permission_arr) {
      permission_list_from_database.push(per.id);
    }

    const dilogRef = this.dialog.open(RoleFormComponent, {
      disableClose: true,
      data: {
        permissions: this.permissions,
        role_id: param,
        role: permission_list_from_database,
        role_name: role_name,
      },
    });
    dilogRef.afterClosed().subscribe((data) => {

    });
  }

}
