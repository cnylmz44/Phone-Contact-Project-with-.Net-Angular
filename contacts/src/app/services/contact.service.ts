import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../models/contact';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private subject = new Subject<any>();

  constructor(private httpClient:HttpClient) { }

  contacts : Contact[] = [];

  apiUrl = "https://localhost:44395/api/"; 

  getContacts():Observable<ListResponseModel<Contact>>{
    return this.httpClient.get<ListResponseModel<Contact>>(this.apiUrl+"Contacts/getall");
  }

  getById(id:number):Observable<SingleResponseModel<Contact>>{
    return this.httpClient.get<SingleResponseModel<Contact>>(this.apiUrl+"Contacts/getbyid?id="+id);
  }

  getFavourites():Observable<ListResponseModel<Contact>>{
    return this.httpClient.get<ListResponseModel<Contact>>(this.apiUrl+"Contacts/getfavourites");
  }

  getHiddens():Observable<ListResponseModel<Contact>>{
    return this.httpClient.get<ListResponseModel<Contact>>(this.apiUrl+"Contacts/gethiddens");
  }

  getBlockeds():Observable<ListResponseModel<Contact>>{
    return this.httpClient.get<ListResponseModel<Contact>>(this.apiUrl+"Contacts/getblockeds");
  }

  add(contact:Contact):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Contacts/add",contact)
  }

  update(contact:Contact):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Contacts/update",contact)
  }

  delete(contact:Contact):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Contacts/delete",contact)
  }
  

  sendClickEvent(){
    this.subject.next();
  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }

} 
