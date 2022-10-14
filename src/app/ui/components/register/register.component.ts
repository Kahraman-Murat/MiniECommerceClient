import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      kullaniciAd: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email1: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password1: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8)
      ]],
      password2: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8)
      ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password1 = group.get("password1").value;
        let password2 = group.get("password2").value;
        return password1 === password2 ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  onSubmit(data: User) {
    this.submitted = true;

    debugger;
    if (this.frm.invalid)
      return;
    
  }
}
