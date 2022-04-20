import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnumType } from '../_models/enumType.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsServService {

    constructor(private datePipe: DatePipe) {}

    calculateEndDate(startDate:Date, scheduledPaymentType:String) {let endDate:String =null;
        switch(scheduledPaymentType) {
            case "ANNUEL": {
              endDate=this.datePipe.transform(startDate.setMonth(startDate.getMonth() + 12),'yyyy-MM-dd');
                //statements; 
                break;
            }
            case "SEMESTRIEL": {
                //statements; 
                endDate=this.datePipe.transform(startDate.setMonth(startDate.getMonth() + 6),'yyyy-MM-dd');
                break;
            }
            case "TRIMESTRIEL": {
                //statements; 
                endDate=this.datePipe.transform(startDate.setMonth(startDate.getMonth() + 3),'yyyy-MM-dd');
                break;
            }
            case "MENSUEL": {
                //statements; 
                endDate=this.datePipe.transform(startDate.setMonth(startDate.getMonth() + 1),'yyyy-MM-dd');
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
        return of(endDate)
    }

}
