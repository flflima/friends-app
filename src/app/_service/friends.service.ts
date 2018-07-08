// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs/Observable';

import { Friend } from '../_model/friend';
import { environment } from './../../environments/environment';

// tslint:disable-next-line:import-blacklist
const API_URL = environment.friendsURL;

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
        console.log(response.status);
        this.alertService.success('Amigo excluído com sucesso!');
        return response.status;
      })
      .catch(this.handleError);
  }



  private handleError(error: Response | any) {
    console.error('FriendsService::handleError', error);

    this.alertService.danger(error);
    return Observable.throw(error);
  }

}
