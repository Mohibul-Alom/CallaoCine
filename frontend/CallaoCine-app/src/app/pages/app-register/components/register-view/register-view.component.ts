import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IRegisterUser } from '../../models/iregister-user';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit {

  public userRegister!: FormGroup;

  public submittedRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route:Router,
    ) {

      this.initFormRegisters();

    }

  ngOnInit(): void {}

  public initFormRegisters(): void {
    this.userRegister = this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(1)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    })
  }

  public onSubmitRegister(): void {
    this.submittedRegister = true;

    const user:IRegisterUser = {
      name: this.userRegister.get('name')?.value,
      email: this.userRegister.get('email')?.value,
      password:this.userRegister.get('password')?.value,
    }

    this.register(user);

    if(this.userRegister.valid){
      this.userRegister.reset();
      this.route.navigate(['home']);
    }
  }

  private register(user:IRegisterUser):void{

    this.authService.register(user.email, user.password,user.name).subscribe({
      next:data => {
        this.authService.setUserInfo(data);
        this.route.navigate(['home']);
      },
      error:error =>{
        console.log(error);
      }
    })

  }

}
