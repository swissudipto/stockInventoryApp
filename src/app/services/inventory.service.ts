import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private client : HttpClient) { }


  getallpurchase():Observable<any>
  {
    return this.client.get('http://localhost:5000/getallpurchase')
  }

  savenewpurchase(newpurchase:any):Observable<any>
  {
    console.warn(newpurchase);
    const body = {"newpurchase" : newpurchase};
    return this.client.post('http://localhost:5000/savepurchase',body);
  }
  
  getallproducts():Observable<any>
  {
    return this.client.get('http://localhost:5000/getallproducts');
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
