import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-det',
  templateUrl: './contract-det.component.html',
  styleUrls: ['./contract-det.component.css']
})
export class ContractDetComponent implements OnInit {

  contractIdFromRoute: any;

  constructor(private route : ActivatedRoute) { 
    const routeParams = this.route.firstChild.params;
        routeParams.subscribe(params => {
            this.contractIdFromRoute = params['contractId'];

        })
  }

  ngOnInit(): void {
  }

}
