import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Friend } from '../../_model/friend';
import { FriendsService } from '../../_service/friends.service';

@Component({
  selector: 'app-friends-crud',
  templateUrl: './friends-crud.component.html',
  styleUrls: ['./friends-crud.component.css']
})
export class FriendsCrudComponent implements OnInit {

  form: FormGroup;
  ageArray: number[];

  idFriend: number;

  constructor(private formBuilder: FormBuilder,
    private friendsService: FriendsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idFriend = +params['id'];
      } else { this.idFriend = null; }
    });
  }

  ngOnInit() {
    this.clearForm();

    // if edition
    if (this.idFriend) {
      this.friendsService.getFriendById(this.idFriend)
        .subscribe(friend => {
          this.form.patchValue({ name: friend.name });
          this.form.patchValue({ age: friend.age });
        });
    }

    // fill ages combobox
    this.ageArray = Array(100).fill(1).map((x, i) => i);
  }

  clearForm() {
    // initialize the form
    this.form = new FormGroup({
      name: this.formBuilder.control('', [Validators.required]),
      age: this.formBuilder.control('')
    });
  }

  saveFriend() {
    const name = this.form.get('name').value;
    const age = this.form.get('age').value;
    const friend = new Friend();
    friend.name = name;
    friend.age = age;

    if (this.idFriend) {
      friend.id = this.idFriend;

      this.friendsService.updateFriend(friend)
        .subscribe(f => {
          this.gotToFriendsList();
        });
    } else {
      this.friendsService.createFriend(friend)
        .subscribe(f => {
          this.clearForm();
        });
    }
  }

  gotToFriendsList() {
    this.router.navigate(['./friends']);
  }
}
