import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-contract',
  templateUrl: './manage-contract.component.html',
  styleUrls: ['./manage-contract.component.css']
})

export class ManageContractComponent implements OnInit {

    contractStatus:string;
    oppositeContractStatus: string;
    typeContract:string;  
    constructor(private router : Router,private route : ActivatedRoute) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit():void {
      const param = this.route.firstChild.paramMap;
      param.subscribe((response)=>this.contractStatus = response.get('contractStatus'));
      if(this.contractStatus == 'ACTIF'){
        this.oppositeContractStatus='INACTIF';
      }else{
        this.oppositeContractStatus='ACTIF';
      }
    }

    /**  Check inactive contract
  */
    btnSeeOldContracts() {
     
      
      this.router.navigate([ '/contract/contractTable/'+this.oppositeContractStatus]);
        
        this.ngOnInit;
        if(this.contractStatus == 'ACTIF'){
          this.oppositeContractStatus='ACTIF';
          this.contractStatus = 'INACTIF';
        }else{
          this.oppositeContractStatus='INACTIF';
          this.contractStatus = 'ACTIF';
        }
    }
}

