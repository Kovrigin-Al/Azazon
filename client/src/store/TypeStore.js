import { makeAutoObservable } from "mobx";

export default class TypesStore {
  constructor() {
    this._className = 'Types'
    this._types = [
    ];
    this._selected = 0
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setSelected(type) {
      this._selected = type
    
  }

  get list() {
    return this._types;
  }
 
  get selected() {
    return this._selected;
  }

  get className() {
    return this._className
  }
}
