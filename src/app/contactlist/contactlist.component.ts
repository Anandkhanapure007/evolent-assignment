import { Component, OnInit ,TemplateRef,ViewContainerRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {FormGroup,FormBuilder, FormControl, Validators } from "@angular/forms";
import { IContact } from "../contact.compoenet.model";
import { ContactService } from "../contact.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  firstName: string;
  contactList: IContact[];
  modalRef: BsModalRef;
  contactId:number;
  contacts={} as IContact;
  errorMessage: string;

  form=new FormGroup({
    id:new FormControl(''),
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('',Validators.required),
    email:new FormControl('',Validators.email),
    mobileNumber:new FormControl('',[Validators.minLength(0),Validators.maxLength(10)]),
    status:new FormControl('')
  })

  constructor(private fb: FormBuilder,private contactService:ContactService,private modalService: BsModalService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public openModal(template: TemplateRef<any>,Id) {
    this.contactService.getIdByContact(Id).subscribe(result=>{
      this.contacts=result;
    });
   this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.getContactList();
  }
 getContactList(){
    this.contactService.getListContact().subscribe(result=>{
      if(result.filter(a=>a.status==true))
      this.contactList=result});
  }  

AddContact(contacts){
  debugger;
  this.contactService.postContact(contacts).subscribe(result=>{console.log(this.contacts)}, error => this.errorMessage = <any>error);
  this.toastr.success('Save Data Successful done', 'Success!');
  this.getContactList();
  this.modalRef.hide();
}
  updateContact(contactData){
    debugger;
    this.contactService.updateContact(contactData).subscribe(result=>{this.getContactList()});
    this.toastr.success('Update Successful done', 'Success!');
    this.modalRef.hide();
  }
  addcontact(template2:TemplateRef<any>){
      this.modalRef = this.modalService.show(template2,{class: 'modal-sm'});
    
  }
  deleteContact(template: TemplateRef<any>,Id){
      this.contactId=Id;
      this.modalRef = this.modalService.show(template,{class: 'modal-sm'});
  }
  confirmDelete(){
    this.contactService.deleteContact(this.contactId).subscribe(result=>{this.getContactList()});
    this.toastr.warning('Delete Successful done', 'Success!');
      this.modalRef.hide();
  }
  decline(){

  }
    public closeModel():void{
    if(this.modalRef){
      this.modalRef.hide();
    }
  }
}
