import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractType } from 'src/app/_models/contractType.model';
import { ContractTypeServService } from 'src/app/_services/contract-type-serv.service';
import * as constErrorMessage from 'src/app/_components/_utils/constErrorMessage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.css']
})
export class ContractInfoComponent implements OnInit {

  newContractForm?: FormGroup;
  editableStatus:boolean =false;
  contractTypes: ContractType[];

  isMandatory = constErrorMessage.isMandatory;
  contractIdFromRoute: any;
  

  constructor(private contractTypeServ: ContractTypeServService, private route : ActivatedRoute) { 
    const routeParams = this.route.snapshot.paramMap;
    this.contractIdFromRoute = Number(routeParams.get('contractId'));

    this.contractTypeServ.getContractTypes().subscribe((response) => {
      this.contractTypes =response;
    });
    this.newContractForm = new FormGroup({
      id: new FormControl(this.contractIdFromRoute),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl(),
      contractStatus: new FormControl('', [Validators.required]),
      contractType: new FormControl
    })
  }



  ngOnInit(): void {

    
  }


  contractFormSubmit(){

  }

  /* convenience getter for easy access
      to mainTenant form fields (left section)*/
      get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newContractForm.controls;
    };


  
  }