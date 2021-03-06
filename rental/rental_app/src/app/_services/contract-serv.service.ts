import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../_models/contract.model';
import { MainTenant } from '../_models/main-tenant.model';
import * as serviceUtils from 'src/app/_utils/servicesUtils';

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
      contract: contract, mainTenant: mt}),serviceUtils.httpOptions);
  }

  deleteContract(id:number){
    return this.http.delete(this.postUrl + '/' + id);
  }

  getContractByStatus(status: string) {
    return this.http.get<any>(this.getByUrl+"status/"+status);
  }

  getContractById(id: number) {
    return this.http.get<any>(this.getByUrl+"id/"+id);
  }

}
