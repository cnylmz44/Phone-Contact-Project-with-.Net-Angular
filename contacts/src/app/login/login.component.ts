import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  registerForm : FormGroup;

  closeResult="";

  editable = true;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService : ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      mail: ["",Validators.required],
      password:["",Validators.required]
    })
  }

   createRegisterForm(){
     this.registerForm = this.formBuilder.group({
       firsT_NAME:["",Validators.required],
       lasT_NAME:["",Validators.required],
       mail:["",Validators.required],
       password:["",Validators.required]
     })
   }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      localStorage.setItem("mail",loginModel.mail)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info("Login successful","Succesfully")
        localStorage.setItem("token",response.data.token)
        setTimeout(() => {
          window.open('http://localhost:4200/', '_self')
        },1000);
      },responseError=>{
        this.toastrService.error("Please check e-mail adress and password!","Error")
      })
    }
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.info("Account is created!","Succesfully")
        setTimeout(() => {
          window.open('http://localhost:4200/', '_self')
        },1000);
      },responseError=>{
        this.toastrService.error("Please fill in all information!")
      })
    }
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.editable = true;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
