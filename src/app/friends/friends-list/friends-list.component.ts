import { Component, OnInit } from '@angular/core';

import { Friend } from './../../_model/friend';
import { FriendsService } from './../../_service/friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  p = 1;
  friends: Friend[];

  constructor(private friendService: FriendsService) { }

  ngOnInit() {
    this.loadAllFriends();
  }

  loadAllFriends() {
    this.friendService.getAll().subscribe(
      data => {
        this.friends = data;
      },
      error => console.log(error)
    );
  }

}
