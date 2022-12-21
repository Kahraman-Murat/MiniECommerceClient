import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { List_Role } from '../../contracts/role/list_role';
import { RoleService } from '../../services/common/models/role.service';
import { UserService } from '../../services/common/models/user.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService) {
    super(dialogRef)           //AuthorizeMenuState | { code: string, name: string }


  }

  roles: { datas: List_Role[], totalRoleCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];
  async ngOnInit() {

    this.spinner.show(SpinnerType.BallAtom)
    this.assignedRoles = await this.userService.getRolesToUser(this.data, () => this.spinner.hide(SpinnerType.BallAtom));

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    //console.log(rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText))
    const selectedRoles: string[] = rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText);
    //console.log(selectedRoles)
    this.spinner.show(SpinnerType.BallAtom);
    this.userService.assignRoleToUser(this.data,  selectedRoles, () => {
      this.spinner.hide(SpinnerType.BallAtom);
    }, error => {

    })
  }

}

