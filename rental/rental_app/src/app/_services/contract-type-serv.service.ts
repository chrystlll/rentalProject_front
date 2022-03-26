import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContractType } from '../_models/contractType.model';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeServService {

  constructor() { }

  private states: ContractType[]  = [
    {"id":"LOGEMENT","name":"LOGEMENT"},
    {"id":"AUTRE_STOCKAGE","name":"AUTRE STOCKAGE"},
    {"id":"STOCKAGE_BATEAU","name":"STOCKAGE BATEAU"},
    {"id":"STOCKAGE_VOITURE","name":"STOCKAGE VOITURE"},
    {"id":"STOCKAGE_CAMPING_CAR","name":"STOCKAGE CAMPING CAR"},
    {"id":"STOCKAGE_CARAVANE","name":"STOCKAGE CARAVANE"},
    {"id":"STOCKAGE_MOTO","name":"STOCKAGE MOTO"}];

   getContractTypes(): Observable<ContractType[]> {
     return of(this.states);
   }
}
