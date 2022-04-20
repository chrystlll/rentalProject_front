import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnumType } from '../_models/enumType.model';

@Injectable({
  providedIn: 'root'
})
export class EnumTypeServService {

  constructor() { }

  private contractType: EnumType[]  = [
    {"id":"LOGEMENT","name":"LOGEMENT"},
    {"id":"AUTRE_STOCKAGE","name":"AUTRE STOCKAGE"},
    {"id":"STOCKAGE_BATEAU","name":"STOCKAGE BATEAU"},
    {"id":"STOCKAGE_VOITURE","name":"STOCKAGE VOITURE"},
    {"id":"STOCKAGE_CAMPING_CAR","name":"STOCKAGE CAMPING CAR"},
    {"id":"STOCKAGE_CARAVANE","name":"STOCKAGE CARAVANE"},
    {"id":"STOCKAGE_MOTO","name":"STOCKAGE MOTO"}];

    private scheduledPaymentType: EnumType[]  = [
      {"id":"ANNUEL","name":"ANNUEL"},
      {"id":"SEMESTRIEL","name":"SEMESTRIEL"},
      {"id":"TRIMESTRIEL","name":"TRIMESTRIEL"},
      {"id":"MENSUEL","name":"MENSUEL"}];

      private durationType: EnumType[]  = [
        {"id":"SEMAINE","name":"SEMAINE"},
        {"id":"MOIS","name":"MOIS"},
        {"id":"ANNEE","name":"ANNEE"}];

   getContractTypes(): Observable<EnumType[]> {
     return of(this.contractType);
   }

   getScheduledPaymentTypes(): Observable<EnumType[]>{
     return of(this.scheduledPaymentType)
   }

   getDurationTypes(): Observable<EnumType[]>{
    return of(this.durationType)
  }
}
