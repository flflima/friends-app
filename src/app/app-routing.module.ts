import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddressesListComponent } from './addresses/addresses-list/addresses-list.component';
import { FriendsCrudComponent } from './friends/friends-crud/friends-crud.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';

const routes: Routes = [
  {
    path: 'friends',
    component: FriendsListComponent
  },
  {
    path: 'friends/create',
    component: FriendsCrudComponent
  },
  {
    path: 'friends/edit/:id',
    component: FriendsCrudComponent
  },
  {
    path: 'addresses/list/:id',
    component: AddressesListComponent
  },
  {
    path: '**',
    redirectTo: 'friends',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
