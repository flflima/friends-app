import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendsListComponent } from './friends/friends-list/friends-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'todos',
  //   pathMatch: 'full'
  // },
  {
    path: 'blah',
    component: FriendsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
