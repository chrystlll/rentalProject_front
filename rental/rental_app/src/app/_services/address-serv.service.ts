import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../_models/address.model';
import { MainTenant } from '../_models/main-tenant.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin':  'http://localhost:8080/'
  })
};
  
@Injectable({
  providedIn: 'root'
})
export class AddressServService {
  

  postUrl = 'http://localhost:8080/api/v1/address';
  getByUrl ='http://localhost:8080/api/v1/address/get/';

  constructor(private http : HttpClient) { }


  getAddressesByMainTenantId(tenantId: any):Observable<Address[]> {
    return this.http.get<any>(this.getByUrl+ "mainTenant/" + tenantId);
  }

  saveAddress(add:Address, mt:MainTenant){   
      return this.http.post(this.postUrl,JSON.stringify({
      address: add,
      mainTenant: mt}),httpOptions);
  }

  deleteAddress(id:Number){
      return this.http.delete(this.postUrl + '/' + id);
  }

}
