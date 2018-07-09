import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AddressesService } from '../../_service/addresses.service';
import { Address } from './../../_model/address';
import { Friend } from './../../_model/friend';
import { FriendsService } from './../../_service/friends.service';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.css']
})
export class AddressesListComponent implements OnInit {

  form: FormGroup;

  idFriend: number;

  friend: Friend;

  allAddresses: Address[];

  addressEdit: Address;

  showCreateForm = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private friendsService: FriendsService,
    private addressesService: AddressesService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idFriend = +params['id'];
      } else { this.idFriend = null; }
    });
  }

  ngOnInit() {
    if (this.idFriend) {
      this.friendsService.getFriendById(this.idFriend)
        .subscribe(friend => {
          this.friend = friend;
        });
      this.getAllAddressesByFriendId();
    } else {
      this.getAllAddresses();
    }

    this.clearForm();
  }

  clearForm() {
    // initialize the form
    this.form = new FormGroup({
      location: this.formBuilder.control(''),
      city: this.formBuilder.control('', [Validators.required]),
      streetName: this.formBuilder.control('', [Validators.required])
    });
  }

  getAllAddressesByFriendId() {
    this.friendsService.getAllAddressesByFriendId(this.idFriend)
      .subscribe(data => {
        this.allAddresses = data;
      });
  }

  getAllAddresses() {
    this.addressesService.getAllAddresses()
      .subscribe(data => {
        this.allAddresses = data;
      });
  }

  createAddress() {
    this.showCreateForm = true;
    this.addressEdit = null;
    this.clearForm();
  }

  closeForm() {
    this.showCreateForm = false;
    this.addressEdit = null;
    this.clearForm();
  }

  saveAddress() {
    const location = this.form.get('location').value;
    const streetName = this.form.get('streetName').value;
    const city = this.form.get('city').value;

    if (this.addressEdit) {
      this.addressEdit.location = location;
      this.addressEdit.streetName = streetName;
      this.addressEdit.city = city;

      this.addressesService.updateAddress(this.addressEdit)
        .subscribe(a => {
          this.clearForm();
          this.getAllAddressesByFriendId();
          this.showCreateForm = false;
          this.addressEdit = null;
        });
    } else {
      const address = new Address();
      address.location = location;
      address.streetName = streetName;
      address.city = city;
      address.friend = this.friend;

      this.addressesService.createAddress(address)
        .subscribe(a => {
          this.clearForm();
          this.getAllAddressesByFriendId();
          this.showCreateForm = false;
          this.addressEdit = null;
        });
    }
  }

  editAddress(address: Address) {
    this.addressEdit = address;
    this.showCreateForm = true;

    this.form.patchValue({ location: address.location });
    this.form.patchValue({ streetName: address.streetName });
    this.form.patchValue({ city: address.city });
  }

  deleteAddress(id: number) {
    this.addressesService.deleteAddressById(id)
      .subscribe(success => {
        this.getAllAddresses();
      });
  }

  gotToFriendsList() {
    this.router.navigate(['./friends']);
  }

}
