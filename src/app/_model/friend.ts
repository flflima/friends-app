export class Friend {

  public id: number;
  public name: string;
  public age: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
