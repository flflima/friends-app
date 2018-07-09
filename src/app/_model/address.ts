import { Friend } from './friend';

export class Address {

  public id: number;
  public location: string;
  public streetName: string;
  public city: string;
  public friend: Friend;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
