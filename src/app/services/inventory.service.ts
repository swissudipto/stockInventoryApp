import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { purchase } from '../Interfaces/puchase.interface';
import { product } from '../Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private client : HttpClient) { }


  getallpurchase():Observable<purchase[]>
  {
    return this.client.get<purchase[]>('https://localhost:7145/getallpurchase')
  }

  savenewpurchase(newpurchase:purchase):Observable<purchase>
  {
    return this.client.post<purchase>('https://localhost:7145/savepurchase',newpurchase);
  }
  
  getallproducts():Observable<product[]>
  {
    return this.client.get<product[]>('https://localhost:7145/getallProducts');
  }

  getallStock():Observable<any>
  {
    return this.client.get('http://localhost:5000/getallStock');
  }

  getallsell():Observable<any>
  {
    return this.client.get('http://localhost:5000/getallsell');
  }

}
