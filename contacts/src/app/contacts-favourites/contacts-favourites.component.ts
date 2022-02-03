import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts-favourites',
  templateUrl: './contacts-favourites.component.html',
  styleUrls: ['./contacts-favourites.component.css']
})
export class ContactsFavouritesComponent implements OnInit {

  dataLoaded = false;

  detail = false;

  contacts : Contact[] = [];

  contact : Contact;

  contactUpdateForm : FormGroup;

  filterText = "";

  closeResult = '';

  constructor(private contactService:ContactService,private modalService: NgbModal,private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getFavourites();
  }

  getFavourites(){
    this.contactService.getFavourites().subscribe(response=>{
      this.contacts = response.data;
      this.dataLoaded = true;
    })
  }

  createContactUpdateForm(){
    this.contactUpdateForm = this.formBuilder.group({
      id :[this.contact.id,Validators.required],
      firsT_NAME :[this.contact.firsT_NAME,Validators.required],
      lasT_NAME :[this.contact.lasT_NAME,Validators.required],
      phonE_NUMBER:[this.contact.phonE_NUMBER,Validators.required],
      mail :[this.contact.mail,Validators.email],
      title:[this.contact.title,Validators.maxLength(30)],
      company:[this.contact.company,Validators.maxLength(30)],
      notes:[this.contact.notes,Validators.maxLength(100)]
    })
  }

  showInfos(id:number,content:any,bool:boolean){
    this.getById(id);
    this.open(content);
  }

  getById(id: number){
    this.contactService.getById(id).subscribe(response=>{
      this.contact = response.data;
      this.dataLoaded = true;
    })
  }

  getDetail(){
    this.detail = true;
  }

  checkPopUp(id:number,content2:any){
    this.getById(id);
    this.open(content2);
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
    },1000);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
}
