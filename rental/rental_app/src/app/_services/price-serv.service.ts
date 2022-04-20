import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../_models/contract.model';
import { Price } from '../_models/price.model';
import * as serviceUtils from 'src/app/_utils/servicesUtils';

@Injectable({
  providedIn: 'root'
})
export class PriceServService {
  

  postUrl = 'http://localhost:8080/api/v1/price';
  getByUrl ='http://localhost:8080/api/v1/price/get/';

  constructor(private http : HttpClient) { }



  deletePriceById(id: number){
    return this.http.delete(this.postUrl + "/" + id);
  }

  getPriceByContractIdAndStatus(id:number,commonStatus:String){
    return this.http.get<any>(this.getByUrl + "contractId/" + id + "/commonStatus/" + commonStatus);
  }

  savePrice(price: Price,contractId:Number) {
    return this.http.post(this.postUrl,JSON.stringify({
      price: price,contractId: contractId}),serviceUtils.httpOptions);
  }

}
