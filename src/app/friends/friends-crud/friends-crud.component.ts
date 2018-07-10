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
  friendEdit: Friend;

  fileToUpload: File;
  fileBase64: string;

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
          if (friend.image) {
            this.fileBase64 = 'data:image/png;base64,' + friend.image;
          }

          // save previous friend version
          this.friendEdit = friend;
        });
    }

    // fill ages combobox
    this.ageArray = Array(100).fill(1).map((x, i) => i);
  }

  clearForm() {
    // initialize the form
    this.form = new FormGroup({
      name: this.formBuilder.control('', [Validators.required]),
      age: this.formBuilder.control(''),
      image: this.formBuilder.control(null)
    });

    this.fileToUpload = null;
    this.fileBase64 = null;
    this.friendEdit = null;
  }

  saveFriend() {
    const name = this.form.get('name').value;
    const age = this.form.get('age').value;
    const friend = new Friend();
    friend.name = name;
    friend.age = age;

    // get previous image, to check later if it was changed
    if (this.friendEdit && this.fileBase64) {
      friend.image = this.friendEdit.image;
    } else {
      friend.image = null;
    }
    if (this.idFriend) {
      // edition of a friend

      // update image
      if (this.fileToUpload) {
        this.friendsService.uploadFriendImage(this.fileToUpload, this.idFriend)
          .subscribe(friendData => {
            this.updateFriend(friendData);
          });
      } else {
        this.updateFriend(friend);
      }
    } else {
      // insert image
      this.friendsService.createFriend(friend)
        .subscribe(f => {
          this.clearForm();
          if (this.fileToUpload) {
            this.friendsService.uploadFriendImage(this.fileToUpload, f.id)
              .subscribe();
          }
        });
    }
  }

  updateFriend(friend: Friend) {
    // update friend data
    friend.id = this.idFriend;

    this.friendsService.updateFriend(friend)
      .subscribe(f => {
        this.gotToFriendsList();
      });
  }

  gotToFriendsList() {
    this.router.navigate(['./friends']);
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    const self = this;
    reader.onload = function () {
      self.fileBase64 = reader.result;
    };
  }

  removeImage() {
    this.fileBase64 = null;
    this.fileToUpload = null;
  }
}
