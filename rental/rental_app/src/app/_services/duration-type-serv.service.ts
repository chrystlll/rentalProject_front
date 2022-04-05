import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DurationType } from '../_models/durationType.model';

@Injectable({
  providedIn: 'root'
})
export class DurationTypeServService {

  constructor() { }

  private durationType: DurationType[]  = [
    {"id":"JOUR","name":"JOUR"},
    {"id":"SEMAINE","name":"SEMAINE"},
    {"id":"MOIS","name":"MOIS"},
    {"id":"ANNEE","name":"ANNEE"},
  ];

   getDurationType(): Observable<DurationType[]> {
     return of(this.durationType);
   }

}
