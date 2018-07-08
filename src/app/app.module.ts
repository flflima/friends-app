import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { FriendsService } from './_service/friends.service';
import { AppComponent } from './app.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendsListComponent
  ],
  imports: [
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
