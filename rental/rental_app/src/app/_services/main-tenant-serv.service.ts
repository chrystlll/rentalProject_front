import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpClientModule } from '@angular/common/http';
import { MainTenant } from '../_models/main-tenant.model';
import { Observable } from 'rxjs/internal/Observable';

 const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin':  'http://localhost:8080/'
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class MainTenantServService {
  postUrl = 'http://localhost:8080/api/v1/mainTenant';

  constructor(private http : HttpClient) {
   }

  getMainTenants():Observable<MainTenant[]>  {
    return this.http.get<any>(this.postUrl);
  }

  saveMainTenant(mainTenant: MainTenant){   
   return this.http.post(this.postUrl,mainTenant,httpOptions);
  }

}
