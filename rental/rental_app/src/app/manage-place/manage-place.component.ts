import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-place',
  templateUrl: './manage-place.component.html',
  styleUrls: ['./manage-place.component.css']
})
export class ManagePlaceComponent implements OnInit {

  
  placeStatus:string;
  oppositePlaceStatus:string; 
  typePlace:string;


  constructor(private router : Router,private route : ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    const param = this.route.firstChild.paramMap;
      param.subscribe((response)=>this.placeStatus = response.get('placeStatus'));
      if(this.placeStatus == 'ACTIF'){
        this.oppositePlaceStatus='INACTIF';
      }else{
        this.oppositePlaceStatus='ACTIF';
      }
  }

  btnSeeOldPlaces(){

    this.router.navigate(['/place/placeTable/'+this.oppositePlaceStatus]);
        
        this.ngOnInit;
        if(this.placeStatus == 'ACTIF'){
          this.oppositePlaceStatus='ACTIF';
          this.placeStatus = 'INACTIF';
        }else{
          this.oppositePlaceStatus='INACTIF';
          this.placeStatus = 'ACTIF';
        }
    }
  
}
