import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadCSVServService {

  constructor(private http:HttpClient) { }
    

  getInfo(url: any){
      return this.http.get(url, {responseType:'text'})
  }
}
