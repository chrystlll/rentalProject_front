import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../_models/contract.model';
import { Price } from '../_models/price.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin':  'http://localhost:8080/'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PriceServService {

  postUrl = 'http://localhost:8080/api/v1/price';
  getByUrl ='http://localhost:8080/api/v1/price/get/';

  constructor(private http : HttpClient) { }

  getPriceByContractId(id : number){
    return this.http.get<any>(this.getByUrl + "contractId/" + id);
  }

  deletePriceById(id: number){
    return this.http.delete(this.postUrl + "/" + id);
  }

  savePrice(price:Price, contract:Contract){   
    return this.http.post(this.postUrl,JSON.stringify({
    price: price,
    contract: contract}),httpOptions);
  }

}
