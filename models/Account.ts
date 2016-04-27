import {
  Relution
} from 'relution';
/**
 * @class Account
 * The Account Model
 */
export class Account extends Relution.Livedata.Model {

  /**
   * @property name
   * @propertyOf Account
   */
  public name: String = 'Max';
  /**
   * @property email
   * @propertyOf Account
   */
  public email: String = 'a@b.c';

  constructor(options) {
    super(options);
  }
}
