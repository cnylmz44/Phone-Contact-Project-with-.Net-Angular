import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NaviComponent } from './navi/navi.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DataTablesModule } from "angular-datatables";
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactsFavouritesComponent } from './contacts-favourites/contacts-favourites.component';
import { ContactsHiddensComponent } from './contacts-hiddens/contacts-hiddens.component';
import { ContactsBlockedsComponent } from './contacts-blockeds/contacts-blockeds.component';
import { SortPipePipe } from './pipes/sort-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    NaviComponent,
    SidebarComponent,
    FilterPipePipe,
    ContactAddComponent,
    LoginComponent,
    ContactUpdateComponent,
    ContactsFavouritesComponent,
    ContactsHiddensComponent,
    ContactsBlockedsComponent,
    SortPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
   NgbModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
