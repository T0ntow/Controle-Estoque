import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3001/tabela/produtos';
  private observerProdutct = new Subject()

  constructor(private http: HttpClient) {}

  getObservableProducts() {
    return this.observerProdutct.asObservable()
  }

  updateObservableProducts() {
    this.observerProdutct.next(true)
  }

  getProducts() {
    return this.http.get(this.apiUrl);
  }
}
