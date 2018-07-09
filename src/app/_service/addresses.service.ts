import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment.prod';
import { Address } from './../_model/address';

// tslint:disable-next-line:import-blacklist
const API_URL = environment.APIURL;

@Injectable()
export class AddressesService {

  constructor(private http: Http,
    private alertService: AlertService) { }

  public getAllAddresses(): Observable<Address[]> {
    return this.http.get(API_URL + '/addresses')
      .map(response => {
        const addresses = response.json();
        return addresses.map((friend) => new Address(friend));
      })
      .catch((error: Response | any) => {
        console.error('AddressesService::handleError', error);
        this.alertService.danger(error);
        return Observable.throw(error);
      });
  }

  public getAddressById(id: number): Observable<Address> {
    return this.http
      .get(API_URL + '/addresses/' + id)
      .map(response => {
        return new Address(response.json());
      })
      .catch((error: Response | any) => {
        console.error('AddressesService::handleError', error);
        this.alertService.danger(error);
        return Observable.throw(error);
      });
  }

  public createAddress(friend: Address): Observable<Address> {
    return this.http
      .post(API_URL + '/addresses', friend)
      .map(response => {
        this.alertService.success('Endereço incluído com sucesso!');
        return new Address(response.json());
      })
      .catch((error: Response | any) => {
        console.error('AddressesService::handleError', error);
        this.alertService.danger(error);
        return Observable.throw(error);
      });
  }

  public updateAddress(friend: Address): Observable<Address> {
    return this.http
      .put(API_URL + '/addresses', friend)
      .map(response => {
        this.alertService.success('Endereço atualizado com sucesso!');
        return new Address(response.json());
      })
      .catch((error: Response | any) => {
        console.error('AddressesService::handleError', error);
        this.alertService.danger(error);
        return Observable.throw(error);
      });
  }

  public deleteAddressById(id: number): Observable<number> {
    return this.http
      .delete(API_URL + '/addresses/' + id)
      .map(response => {
        this.alertService.success('Endereço excluído com sucesso!');
        return response.status;
      })
      .catch((error: Response | any) => {
        console.error('AddressesService::handleError', error);
        this.alertService.danger(error);
        return Observable.throw(error);
      });
  }

}
