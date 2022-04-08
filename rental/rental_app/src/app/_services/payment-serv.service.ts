import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as serviceUtils from 'src/app/_utils/servicesUtils';
import { Contract } from '../_models/contract.model';
import { Payment } from '../_models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentServService {
  postUrl = 'http://localhost:8080/api/v1/payment';
  getByUrl ='http://localhost:8080/api/v1/payment/get/';

  constructor(private http : HttpClient) { }

  getPaymentByContractId(id : number){
    return this.http.get<any>(this.getByUrl + "contract/" + id,serviceUtils.httpOptions);
  }


  savePayment(payment:Payment, contract:Contract){   
    return this.http.post(this.postUrl,JSON.stringify({
      payment: payment,
    contract: contract}),serviceUtils.httpOptions);
  }

}
