import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../_models/contract.model';
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
export class ContractServService {

  postUrl = 'http://localhost:8080/api/v1/contract';
  getByUrl ='http://localhost:8080/api/v1/contract/get/';

  constructor(private http : HttpClient) { }


  getContractsByMainTenantId(tenantId: any):Observable<Contract[]> {
    return this.http.get<any>(this.getByUrl+ "mainTenant/" + tenantId);
  }

  saveContract(contract:Contract, mt:MainTenant){   
    return this.http.post(this.postUrl,JSON.stringify({
      contract: contract, mainTenant: mt}),httpOptions);
  }

}
