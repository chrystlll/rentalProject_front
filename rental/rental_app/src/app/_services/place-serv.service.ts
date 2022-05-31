import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../_models/place.model';
import * as serviceUtils from 'src/app/_utils/servicesUtils';


@Injectable({
  providedIn: 'root'
})
export class PlaceServService {
  

  postUrl = 'http://localhost:8080/api/v1/place';
  getByUrl ='http://localhost:8080/api/v1/place/get/';


  constructor(private http : HttpClient) { }

  getPlaceByStatus(typePlace: string):Observable<any> {
    console.log(typePlace);
    return this.http.get<any>(this.getByUrl + "commonStatus/" + typePlace,serviceUtils.httpOptions);
  
  }

  deletePlace(id: number):any {
    return null;
  }
  
}
