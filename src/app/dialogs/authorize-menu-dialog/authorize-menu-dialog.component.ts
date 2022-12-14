import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { MatSelect } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { List_Role } from '../../contracts/role/list_role';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint.service';
import { RoleService } from '../../services/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';


@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
    private spinner: NgxSpinnerService) {
    super(dialogRef)           //AuthorizeMenuState | { code: string, name: string }

    
  }

  roles: { datas: List_Role[], totalRoleCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];
  async ngOnInit() {
    

    this.assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);

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
    this.authorizationEndpointService.assignRoleEndpoint(selectedRoles, this.data.code, this.data.menuName, () => {
      this.spinner.hide(SpinnerType.BallAtom);
    }, error => {

    })
  }

}

export enum AuthorizeMenuState {
  Yes,
  No
}
