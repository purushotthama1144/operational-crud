import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments = [];

  departmentListForm = new FormGroup({
    tenant_id: new FormControl(1),
    page: new FormControl(1),
  });

  constructor(
    private dialog: MatDialog,
    private _cdref: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    public router: Router,
    private departmentService : DepartmentService
  ) {}

  ngOnInit(): void {
    this.fetchList()
  }

  addDepartment(params: number) {
    const dilogRef = this.dialog.open(DepartmentFormComponent, {
      disableClose: true,
      data: {
        department_id: params,
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  editDepartment(department:any) {
    console.log(department)
    
    const dilogRef = this.dialog.open(DepartmentFormComponent, {
      disableClose: true,
      data: {
        department ,
        department_id: department.id 
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  deleteDepartment(organizationId:number) {
    this.departmentService.departmentDelete(organizationId).subscribe((data:any) => {
      console.log(data)
      if(data){
        this.fetchList()
      }
    })
  }

  fetchList() {
    const payload = {
      'organization':1,
      'branch':1
    }
    this.departmentService.getDepartmentList(payload).subscribe((data:any) => {
      console.log(data);
      this.departments = [
        ...new Map(
          this.departments.concat(data['results']).map((item) => [item['id'], item])
        ).values(),
      ];
      console.log(this.departments)
    });
  }
}
