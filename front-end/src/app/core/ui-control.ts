import { Control } from './control';

export abstract class UIControl extends Control {
  public $loading: Boolean = true;

  constructor() {
    super();
  }
}
