import { Component, OnInit, Output } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  constructor(private contactsService:ContactService) { }

  ngOnInit(): void {
  }

  getFavourites(){
    this.contactsService.sendClickEvent();
  }

  getHiddens(){
    this.contactsService.sendClickEvent();
  }

  getBlocks(){
    this.contactsService.sendClickEvent();
  }

}
