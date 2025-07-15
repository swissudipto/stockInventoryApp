import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { purchase } from '../Interfaces/puchase.interface';
import { product } from '../Interfaces/product.interface';
import { stock } from '../Interfaces/stock.interface';
import { environment } from 'src/environments/environment.prod';
import { sell } from '../Interfaces/sell.interface';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private client: HttpClient) { }
  private apiUrl = environment.apiUrl;

  getallpurchase(pageNumber: Number,pageSize: Number): Observable<any> {
    return this.client.get<any>(`${this.apiUrl}/getallpurchase?page=${pageNumber}&pageSize=${pageSize}`);
  }

  savenewpurchase(newpurchase: purchase): Observable<purchase> {
    return this.client.post<purchase>(
      `${this.apiUrl}/savepurchase`,
      newpurchase
    );
  }

  getallproducts(): Observable<product[]> {
    return this.client.get<product[]>(`${this.apiUrl}/getallProducts`);
  }

  getallStock(): Observable<stock[]> {
    return this.client.get<stock[]>(`${this.apiUrl}/getallStock`);
  }

  getallsell(): Observable<any> {
    return this.client.get(`${this.apiUrl}/getallsell`);
  }

  getallsells(pageNumber: Number,pageSize: Number): Observable<any> {
    return this.client.get(`${this.apiUrl}/getallsell?page=${pageNumber}&pageSize=${pageSize}`);
  }

  saveNewProduct(newProduct: product): Observable<product> {
    return this.client.post<product>(`${this.apiUrl}/saveProduct`, newProduct);
  }

  saveNewSell(newSell: sell): Observable<sell> {
    return this.client.post<sell>(`${this.apiUrl}/savesell`, newSell);
  }
}
