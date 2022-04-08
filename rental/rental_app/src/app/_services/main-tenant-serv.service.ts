import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpClientModule } from '@angular/common/http';
import { MainTenant } from '../_models/main-tenant.model';
import { Observable } from 'rxjs/internal/Observable';
import * as serviceUtils from 'src/app/_utils/servicesUtils';

@Injectable({
  providedIn: 'root'
})
export class MainTenantServService {
 
  postUrl = 'http://localhost:8080/api/v1/mainTenant';
  getByUrl ='http://localhost:8080/api/v1/mainTenant/get/';

  constructor(private http : HttpClient) {
   }

  getMainTenants():Observable<MainTenant[]>  {
    return this.http.get<any>(this.postUrl);
  }

  saveMainTenant(mainTenant: MainTenant){   
   return this.http.post(this.postUrl,mainTenant,serviceUtils.httpOptions);
  }

  getMainTenantByEmail(email : String){
    return this.http.get(this.getByUrl + "email/" + email);
  }

  deleteMainTenantById(id: number){
    return this.http.delete(this.postUrl + "/" + id);
  }

  getMainTenantById(id: number){
    return this.http.get(this.getByUrl + "id/" +  id);
  }

  updateMainTenant(mainTenant: MainTenant){
    return this.http.post(this.postUrl + "/post/",mainTenant,serviceUtils.httpOptions);
  }

  getMainTenantByContractId(id: number) {
    return this.http.get(this.getByUrl + "contractId/" + id);
  }
}
