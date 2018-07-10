import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ContactService } from "./contact.service";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ContactlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
       { path:'home',component:ContactlistComponent },
      {path:'',redirectTo:'home', pathMatch: 'full'}
   ])
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
