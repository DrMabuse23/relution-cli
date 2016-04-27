import {
  Relution
} from 'relution';
/**
 * @class User
 * The User Model
 */
export class User extends Relution.Livedata.Model {

  /**
   * @property firstName
   * @propertyOf User
   */
  public firstName: String = 'Max';
  /**
   * @property lastName
   * @propertyOf User
   */
  public lastName: String = 'Müller';

  constructor(options) {
    super(options);
  }
}
