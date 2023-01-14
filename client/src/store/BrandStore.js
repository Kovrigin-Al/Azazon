import { makeAutoObservable } from "mobx";

export default class BrandStore {
  constructor() {
    this._className = 'Brands'
    this._brands = [
    ];
    this._selected = 0
    makeAutoObservable(this);
  }

  setBrands(brands) {
    this._brands = brands;
  }
  setSelected(brand) {
  
      this._selected = brand
      }

  get list() {
    return this._brands;
  }
  get selected() {
    return this._selected;
  }

  get className() {
    return this._className
  }
}
