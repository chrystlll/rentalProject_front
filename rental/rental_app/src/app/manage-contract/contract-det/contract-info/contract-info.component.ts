import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractType } from 'src/app/_models/contractType.model';
import { ContractTypeServService } from 'src/app/_services/contract-type-serv.service';
import * as constErrorMessage from 'src/app/_components/_utils/constErrorMessage';
import Utils from 'src/app/_components/_utils/fctUtils';

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
  form = Utils.form(this.newContractForm);

  constructor(private contractTypeServ: ContractTypeServService) { 
    this.contractTypeServ.getContractTypes().subscribe((response) => {
      this.contractTypes =response;
    });
    this.newContractForm = new FormGroup({
      id: new FormControl,
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl(),
      contractStatus: new FormControl('', [Validators.required]),
      contractType: new FormControl
    })
  }

  ngOnInit(): void {

    
  }


  contractFormSubmit(){

  }}
