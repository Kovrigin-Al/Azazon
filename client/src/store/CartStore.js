import { makeAutoObservable, toJS } from "mobx";

export default class CartSrore {
  constructor() {
    this._className = "Cart";
    this._cartItems = [];
    makeAutoObservable(this);
  }

  addCartItem(itemId) {
    this._cartItems.push(itemId);
  }

  removeItem(itemId) {
    this._cartItems = toJS(this._cartItems).filter((i) => i !== itemId);
  }

  setList(items) {
    this._cartItems = items;
  }

  get list() {
    return this._cartItems;
  }

  get className() {
    return this._className;
  }
}
