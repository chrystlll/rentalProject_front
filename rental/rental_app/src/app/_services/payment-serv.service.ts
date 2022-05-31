import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as serviceUtils from 'src/app/_utils/servicesUtils';
import { Contract } from '../_models/contract.model';
import { ScheduledPayment } from '../_models/scheduledPayment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentServService {
  postUrl = 'http://localhost:8080/api/v1/scheduledPayment';
  getByUrl ='http://localhost:8080/api/v1/scheduledPayment/get/';

  constructor(private http : HttpClient) { }

  getPaymentByContractId(id : number){
    return this.http.get<any>(this.getByUrl + "contract/" + id,serviceUtils.httpOptions);
  }

  getPaymentByContractIdAndStatus(id:number,status:String){
    return this.http.get<any>(this.getByUrl + "contract/" + id + "/commonStatus/" + status ,serviceUtils.httpOptions);
  }

  savePayment(payment:ScheduledPayment, contract:Contract){   
    console.log(payment)
    return this.http.post(this.postUrl,JSON.stringify({
      payment: payment,
    contract: contract}),serviceUtils.httpOptions);
  }
}
