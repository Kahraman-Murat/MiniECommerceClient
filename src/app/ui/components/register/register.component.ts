import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { Create_User } from '../../../contracts/users/create_user';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService) {
      super(spinner);
  }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["", [
        Validators.required //,
        //Validators.maxLength(20),
        //Validators.minLength(8)
      ]],
      passwordConfirm: ["", [
        Validators.required //,
        //Validators.maxLength(20),
        //Validators.minLength(8)
      ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid)
      return;    
    
    const result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.toastrService.message(result.message, "Kullanici Kaydi Basarili", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopLeft
      })      
    }
    else {      
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopLeft
      })
    }
  }
}
