export class Friend {

  public id: number;
  public name: string;
  public age: number;
  public image: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
