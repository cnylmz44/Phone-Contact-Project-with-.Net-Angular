import { Component, OnInit,Input } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  contact : Contact;

  contactUpdateForm : FormGroup;

  editable = true;

  detail = false;

  constructor(private formBuilder:FormBuilder,private contactService:ContactService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createContactUpdateForm();
  }

  createContactUpdateForm(){
    this.contactUpdateForm = this.formBuilder.group({
      firsT_NAME :["",Validators.required],
      lasT_NAME :["",Validators.required],
      phonE_NUMBER:["",Validators.required],
      mail :["",Validators.email],
      title:["",Validators.maxLength(30)],
      company:["",Validators.maxLength(30)],
      notes:["",Validators.maxLength(100)]
    })
  }

  update(){
    if(this.contactUpdateForm.valid){
      let contactModel = Object.assign({},this.contactUpdateForm.value)
      this.contactService.update(contactModel).subscribe(data=>{
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
