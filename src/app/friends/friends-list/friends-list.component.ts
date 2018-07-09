import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Friend } from '../../_model/friend';
import { FriendsService } from '../../_service/friends.service';
import { AddressesService } from './../../_service/addresses.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  p = 1;
  friends: Friend[];

  constructor(private friendsService: FriendsService,
    private addressService: AddressesService,
    private router: Router) { }

  ngOnInit() {
    this.loadAllFriends();
  }

  loadAllFriends() {
    this.friendsService.getAllFriends().subscribe(
      data => {
        this.friends = data;
      },
      error => console.log(error)
    );
  }

  newFriend() {
    this.router.navigate(['./friends/create']);
  }

  editFriend(id: number) {
    this.router.navigate(['./friends/edit', id]);
  }

  deleteFriend(id: number) {
    this.friendsService.deleteFriendById(id)
      .subscribe(success => {
        this.loadAllFriends();
      });
  }

  listAddress(id: number) {
    this.router.navigate(['./addresses/list', id]);
  }
}
