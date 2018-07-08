import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';
import { NgxPaginationModule } from 'ngx-pagination';

import { FriendsService } from './_service/friends.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendsCrudComponent } from './friends/friends-crud/friends-crud.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendsListComponent,
    FriendsCrudComponent
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
    FriendsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
