import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsSqlService {
  private apiUrl = 'https://node-mysql-api-exw0.onrender.com/produtos';

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
    return this.http.post('https://node-mysql-api-exw0.onrender.com/adicionar-produto', productData)
  }

  editProduct(productData: any) {
    return this.http.put(`https://node-mysql-api-exw0.onrender.com/editar-produto/${productData.id}`, productData)
  }

  atualizarItem(productData: any) {
    return this.http.put(`https://node-mysql-api-exw0.onrender.com/atualizar-produto/${productData.id}`, productData)
  }

  deletarProduto(id: number) {
    return this.http.delete(`https://node-mysql-api-exw0.onrender.com/deletar-produto/${id}`)
  }

}