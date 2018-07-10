import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
 import { Observable } from 'rxjs';

import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IContact } from "./contact.compoenet.model";


@Injectable()

export class ContactService {

private Url:'http://localhost:3004/contacts';

private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
  constructor(private http: HttpClient) { }

contactsObj:object={};
  postContact(contacts:IContact):Observable<IContact>{
    this.contactsObj={
     "id":contacts.id,
     "firstName":contacts.firstName,
     "lastName":contacts.lastName,
     "email":contacts.email,
     "mobileNumber":contacts.mobileNumber,
     "status":contacts.status,
    }
    return this.http.post<IContact>("http://localhost:3004/contacts",this.contactsObj,this.httpOptions);
  }
  getListContact():Observable<IContact[]>{
    return this.http.get<IContact[]>("http://localhost:3004/contacts",this.httpOptions);
  }
  getIdByContact(Id):Observable<IContact>{
    return this.http.get<IContact>("http://localhost:3004/contacts/"+Id,this.httpOptions);
  }
  updateContact(data):Observable<IContact>{
    return this.http.put<IContact>("http://localhost:3004/contacts/"+data.id,data,this.httpOptions);
  }
  deleteContact(contactId):Observable<IContact>{
    return this.http.delete<IContact>("http://localhost:3004/contacts/" +contactId,this.httpOptions)

  }
 
}
