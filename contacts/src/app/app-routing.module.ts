import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactsBlockedsComponent } from './contacts-blockeds/contacts-blockeds.component';
import { ContactsFavouritesComponent } from './contacts-favourites/contacts-favourites.component';
import { ContactsHiddensComponent } from './contacts-hiddens/contacts-hiddens.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:ContactsComponent,canActivate:[LoginGuard]},
  {path:"Contacts",component:ContactsComponent,canActivate:[LoginGuard]},
  {path:"Contacts/add",component:ContactAddComponent,canActivate:[LoginGuard]},
  {path:"Contacts/update",component:ContactUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"Contacts/favourites",component:ContactsFavouritesComponent,canActivate:[LoginGuard]},
  {path:"Contacts/hiddens",component:ContactsHiddensComponent,canActivate:[LoginGuard]},
  {path:"Contacts/blockeds",component:ContactsBlockedsComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
