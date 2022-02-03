import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  contactAddForm : FormGroup;

  editable = true;

  detail = false;

  constructor(private formBuilder:FormBuilder,private contactService:ContactService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createContactAddForm();
  }

  createContactAddForm(){
    this.contactAddForm = this.formBuilder.group({
      firsT_NAME :["",Validators.required],
      lasT_NAME :["",Validators.required],
      phonE_NUMBER:["",Validators.required],
      mail :["",Validators.email],
      title:["",Validators.maxLength(30)],
      company:["",Validators.maxLength(30)],
      notes:["",Validators.maxLength(100)]
    })
  }

  add(){
    if(this.contactAddForm.valid){
      let contactModel = Object.assign({},this.contactAddForm.value)
      this.contactService.add(contactModel).subscribe(data=>{
        this.toastrService.success(data.message,"Succesfully")
        // setTimeout(() => {
        //   window.open('http://localhost:4200/', '_self')
        // },1000);         
      },dataError=>{
        console.log(dataError)
        this.toastrService.error(dataError.error)
      })
      this.editable = false; 
    }
    else{
      this.toastrService.error("Something went wrong.Please check and try again...","Error")
    }
  }

  showMore(){
    this.detail = true
  }
}
