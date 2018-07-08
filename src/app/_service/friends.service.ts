// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Friend } from '../_model/friend';
import { environment } from './../../environments/environment';

// tslint:disable-next-line:import-blacklist
const API_URL = environment.friendsURL;

@Injectable()
export class FriendsService {

  constructor(private http: Http) { }

  public getAll(): Observable<Friend[]> {
    const cpHeaders = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET'
    });
    const options = new RequestOptions({ headers: cpHeaders });

    return this.http.get(API_URL + 'friends/', options)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('BarcodeService::handleError', error);
    return Observable.throw(error);
  }

}
