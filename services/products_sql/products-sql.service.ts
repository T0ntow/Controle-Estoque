import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsSqlService {
  private apiUrl = 'http://localhost:3005/produtos';

  private observerProdutct = new Subject()

  constructor(private http: HttpClient) {}

  getObservableProducts() {
    return this.observerProdutct.asObservable()
  }

  updateObservableProducts() {
    this.observerProdutct.next(true)
    console.log("update");
    
  }

  // functions

  getAllProducts() {
    return this.http.get(this.apiUrl);
  }

  newProduct(productData: any) {
    return this.http.post('http://localhost:3005/adicionar-produto', productData)
  }

  editProduct(productData: any) {
    return this.http.put(`http://localhost:3005/editar-produto/${productData.id}`, productData)
  }

  atualizarItem(productData: any) {
    return this.http.put(`http://localhost:3005/atualizar-produto/${productData.id}`, productData)
  }

  deletarProduto(id: number) {
    return this.http.delete(`http://localhost:3005/deletar-produto/${id}`)
  }

}