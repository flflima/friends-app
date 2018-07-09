// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Friend } from '../_model/friend';
import { Address } from './../_model/address';

const API_URL = environment.APIURL;

@Injectable()
export class FriendsService {

  constructor(private http: Http,
    private alertService: AlertService) { }

  public getAllFriends(): Observable<Friend[]> {
    return this.http.get(API_URL + '/friends')
      .map(response => {
        const friends = response.json();
        return friends.map((friend) => new Friend(friend));
      })
      .catch(this.handleError);
  }

  public getAllAddressesByFriendId(id: number): Observable<Address[]> {
    return this.http.get(API_URL + '/friends/' + id + '/addresses')
      .map(response => {
        const addresses = response.json();
        return addresses.map((address) => new Address(address));
      })
      .catch(this.handleError);
  }

  public getFriendById(id: number): Observable<Friend> {
    return this.http
      .get(API_URL + '/friends/' + id)
      .map(response => {
        return new Friend(response.json());
      })
      .catch(this.handleError);
  }

  public createFriend(friend: Friend): Observable<Friend> {
    return this.http
      .post(API_URL + '/friends', friend)
      .map(response => {
        this.alertService.success('Amigo incluído com sucesso!');
        return new Friend(response.json());
      })
      .catch(this.handleError);
  }

  public updateFriend(friend: Friend): Observable<Friend> {
    return this.http
      .put(API_URL + '/friends', friend)
      .map(response => {
        this.alertService.success('Amigo atualizado com sucesso!');
        return new Friend(response.json());
      })
      .catch(this.handleError);
  }

  public deleteFriendById(id: number): Observable<number> {
    return this.http
      .delete(API_URL + '/friends/' + id)
      .map(response => {
        this.alertService.success('Amigo excluído com sucesso!');
        return response.status;
      })
      .catch((error: Response | any) => {
        this.alertService.danger(error);
        console.error('FriendsService::handleError', error);
        return Observable.throw(error);
      });
  }

  private handleError(error: Response | any) {
    this.alertService.danger('error');
    console.error('FriendsService::handleError', error);
    return Observable.throw(error);
  }

}
