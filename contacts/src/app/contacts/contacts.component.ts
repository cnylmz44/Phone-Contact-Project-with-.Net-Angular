import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { style } from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  constructor(private contactService:ContactService,private modalService: NgbModal,
    private toastrService:ToastrService,private formBuilder:FormBuilder,private http: HttpClient) {
      // this.clickEventSubscription1 = this.contactService.getClickEvent().subscribe(()=>{
      //   this.showFavourites();
      // });
      // this.clickEventSubscription2 = this.contactService.getClickEvent().subscribe(()=>{
      //   this.showHiddens();
      // });
      // this.clickEventSubscription3 = this.contactService.getClickEvent().subscribe(()=>{
      //   this.showBlocks();
      // });
     }

  contactAddForm : FormGroup;

  contactUpdateForm : FormGroup;

  contacts : Contact[] = [];

  displayedContacts : Contact[] = [];

  contactsTemp : Contact[] = [];

  contact : Contact;

  closeResult = '';

  dataLoaded = false;

  editable = true;

  detail = false;

  filterText = "";

  fileName = '';

  ngOnInit(): void {
    this.getContacts();
    this.createContactAddForm();
  }

  createContactAddForm(){
    this.contactAddForm = this.formBuilder.group({
      firsT_NAME :["",Validators.required],
      lasT_NAME :["",Validators.maxLength(30)],
      phonE_NUMBER:["",Validators.required],
      mail :["",Validators.email],
      title:["",Validators.maxLength(30)],
      company:["",Validators.maxLength(30)],
      notes:["",Validators.maxLength(100)]
    })
  }

  createContactUpdateForm(){
    this.contactUpdateForm = this.formBuilder.group({
      id :[this.contact.id,Validators.required],
      firsT_NAME :[this.contact.firsT_NAME,Validators.required],
      lasT_NAME :[this.contact.lasT_NAME,Validators.maxLength(30)],
      phonE_NUMBER:[this.contact.phonE_NUMBER,Validators.required],
      mail :[this.contact.mail,Validators.email],
      title:[this.contact.title,Validators.maxLength(30)],
      company:[this.contact.company,Validators.maxLength(30)],
      notes:[this.contact.notes,Validators.maxLength(100)]
    })
  }

  getContacts(){
    this.contactService.getContacts().subscribe(response=>{
      this.contacts = response.data;
      this.dataLoaded = true;
    })
  }

  showInfos(id:number,content2:any,bool:boolean){
    this.getById(id);
    this.open(content2);
    if(bool==true){
      this.edit();
    }
  }

  getById(id: number){
    this.contactService.getById(id).subscribe(response=>{
      this.contact = response.data;
      this.dataLoaded = true;
    })
  }

  delete(contact:Contact){
    this.contactService.delete(contact).subscribe(data=>{
      this.toastrService.success(data.message,"Succesfully")
      setTimeout(() => {
        window.open('http://localhost:4200/', '_self')
      },500);
    },dataError=>{
      console.log(dataError)
      this.toastrService.error(dataError.error)
    })
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
      this.detail = false;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.detail = false;
      return 'by clicking on a backdrop';
    } else {
      this.detail = false;
      return `with: ${reason}`;
    }
  }

  add(){
    if(this.contactAddForm.valid){
      let contactModel = Object.assign({},this.contactAddForm.value)
      this.contactService.add(contactModel).subscribe(data=>{
        this.toastrService.success("Contact is added!","Succesfully")//data.message
         setTimeout(() => {
           window.open('http://localhost:4200/', '_self')
         },500);         
      },dataError=>{
        console.log(dataError)
        this.toastrService.error("Something went wrong.Please check and try again...","Error")
      })
      this.editable = false; 
    }
    else{
      this.toastrService.error("Something went wrong.Please check and try again...","Error")
    }
  }

  edit(){
    this.editable = false;
    this.createContactUpdateForm();
  }

  update(){
    if(this.contactUpdateForm.valid){
      let contactModel = Object.assign({},this.contactUpdateForm.value)
      this.contactService.update(contactModel).subscribe(data=>{
        this.toastrService.success("Contact is updated!","Succesfully")//data.message
         setTimeout(() => {
           window.open('http://localhost:4200/', '_self')
         },500);         
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

  editFavourite(id:number){

    if(this.contact.favourite==true){
      this.contact.favourite= false;
      this.toastrService.info("Removed from Favourites!","Succesfully");
    }
    else{
      this.contact.favourite=true;
      this.toastrService.info("Added to Favourites!","Succesfully"); 
    }
    this.contactService.update(this.contact).subscribe();
    setTimeout(() => {
      window.open('http://localhost:4200/', '_self')
    },500);
  }

  editHide(id:number){
    if(this.contact.hide==false){
      this.contact.hide = true;
      this.toastrService.info("The contact is hidden!","Succesfully");
    }
    this.contactService.update(this.contact).subscribe();
    setTimeout(() => {
      window.open('http://localhost:4200/', '_self')
    },500);
  }

  editBlock(id:number){

    if(this.contact.block==false){
      this.contact.block = true;
      this.toastrService.info("The contact is blocked!","Succesfully");
    }
    else{
      this.contact.block = false;
      this.toastrService.info("Blocking is undone!","Succesfully"); 
    }
    this.contactService.update(this.contact).subscribe();
    setTimeout(() => {
      window.open('http://localhost:4200/', '_self')
    },500);
  }

  checkPopUp(id:number,content:any){
    this.getById(id);
    this.open(content);
  }

  showFavourites(){
    for (let contact of this.contacts) {
      if(contact.favourite==true){
        this.contactsTemp.push(contact);
      }      
    }
    this.contacts = this.contactsTemp;
  }

  showHiddens(){
    for (let contact of this.contacts) {
      if(contact.hide==true){
        this.contactsTemp.push(contact);
      }      
    }
    this.contacts = this.contactsTemp;
  }

  showBlocks(){
    for (let contact of this.contacts) {
      if(contact.block==true){
        this.contactsTemp.push(contact);
      }      
    }
    this.contacts = this.contactsTemp;
  }
  
  getDetail(){
    this.detail = true;
  }

  hideContacts(){
    for (let contact of this.contacts) {
      if(contact.hide==false){
        this.displayedContacts.push(contact);
      }      
    }
    this.contacts = this.displayedContacts;
  }
//   onFileSelected(event:any) {

//     const file:File = event.target.files[0];

//     if (file) {
//       debugger;
//         this.fileName = file.name;

//         const formData = new FormData();

//         formData.append("thumbnail", file);

//         const upload$ = this.http.post("/api/thumbnail-upload", formData);

//         upload$.subscribe();
//     }
// }

}