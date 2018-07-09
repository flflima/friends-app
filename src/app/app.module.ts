import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';
import { NgxPaginationModule } from 'ngx-pagination';

import { AddressesService } from './_service/addresses.service';
import { FriendsService } from './_service/friends.service';
import { AddressesListComponent } from './addresses/addresses-list/addresses-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendsCrudComponent } from './friends/friends-crud/friends-crud.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendsListComponent,
    FriendsCrudComponent,
    AddressesListComponent
  ],
  imports: [
    AlertModule.forRoot({ maxMessages: 5, timeout: 2000 }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule
  ],
  providers: [
    AddressesService,
    FriendsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
