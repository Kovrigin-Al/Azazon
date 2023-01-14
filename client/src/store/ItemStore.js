import { makeAutoObservable } from "mobx";

export default class ItemStore {
  constructor() {
    this._items = [
    ];
    this._currentPage = 1;
    this._totalPages = 0;
    this._limit = 8;
    makeAutoObservable(this);
  }

  setItems(items) {
    this._items = items;
  }
  get items() {
    return this._items;
  }

  setCurrentPage(page) {
    this._currentPage = page;
  }
  get currentPage() {
    return this._currentPage;
  }

  setTotalPages(total) {
    this._totalPages = total;
  }
  get totalPages() {
    return this._totalPages;
  }

  setLimit(limit) {
    this._limit = limit;
  }
  get limit() {
    return this._limit;
  }
}
