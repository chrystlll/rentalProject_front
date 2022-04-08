import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../_models/address.model';
import { MainTenant } from '../_models/main-tenant.model';
import * as serviceUtils from 'src/app/_utils/servicesUtils';

  
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
      mainTenant: mt}),serviceUtils.httpOptions);
  }

  deleteAddress(id:Number){
      return this.http.delete(this.postUrl + '/' + id);
  }

}
