import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BranchService } from '../branch.service';
import { BranchFormComponent } from '../branch-form/branch-form.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  branchs = [];
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
    private branchService : BranchService
  ) {}

  ngOnInit(): void {
    this.fetchList()
  }

  addBranch(params: number) {
    const dilogRef = this.dialog.open(BranchFormComponent, {
      disableClose: true,
      data: {
        branch_id: params,
        branch: [],
        branch_name: '',
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  editBranch(branch: string[], param: number, branch_name: string , 
    branch_state:string , 
    branch_country:string,
    branch_city:string) {
    console.log(branch)
    
    const dilogRef = this.dialog.open(BranchFormComponent, {
      disableClose: true,
      data: {
        branch_id: param,
        branch_name:branch_name,
        branch_state: branch_state,
        branch_country: branch_country,
        branch_city: branch_city,
        branch: branch,
      },
    });
    dilogRef.afterClosed().subscribe((data) => {
      this.fetchList()
    });
  }

  deleteBranch(branchId:number) {
    console.log(branchId)
    this.branchService.branchDelete(branchId).subscribe((data:any) => {
      console.log(data)
      if(data){
        this.fetchList()
      }
    })
  }

  fetchList() {
    const payload = {
      organization: 1
    }
    this.branchService.getBranchList(payload).subscribe((data) => {
      console.log(data);
      this.branchs = [
        ...new Map(
          this.branchs.concat(data['results']).map((item) => [item['id'], item])
        ).values(),
      ];
      console.log(this.branchs)
      this.role_count = data['count'];
      this._cdref.detectChanges();
    });
  }
}
