import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsSqlService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(this.apiUrl);
  }

  newProduct(productData: any) {
    return this.http.post('http://localhost:3000/adicionar-produto', productData);
  }

  editProduct(productData: any) {
    return this.http.put(`http://localhost:3000/editar-produto/${productData.id}`, productData)
  }

  atualizarItem(productData: any) {
    return this.http.put(`http://localhost:3000/atualizar-produto/${productData.id}`, productData)
  }

}