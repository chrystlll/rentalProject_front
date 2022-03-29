
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/_models/contract.model';
import { ContractType } from 'src/app/_models/contractType.model';
import { MainTenant } from 'src/app/_models/main-tenant.model';
import { ContractServService } from 'src/app/_services/contract-serv.service';
import { ContractTypeServService } from 'src/app/_services/contract-type-serv.service';
import * as constErrorMessage from 'src/app/_components/_utils/constErrorMessage';


@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit, AfterViewInit  {

activateEditForm: boolean = false;
newContractForm !: FormGroup;
formStatus: boolean = false;
displayedColumns: string[] = ['startDate', 'endDate', 'contractType','contractStatus','details','delete'];
tenantIdFromRoute: any;
contract: Contract = new Contract;
mT: MainTenant = new MainTenant();


isMandatory = constErrorMessage.isMandatory;
contractTypes: ContractType[] =[];

/* Manage the form validity*/
/* convenience getter for easy access
      to mainTenant form fields (left section)*/
      get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newContractForm.controls;
    };

    /* check if the form is valid*/
    get formStatusValue() {
        if ('VALID' === this.newContractForm.status) {
            this.formStatus = true;
        } else {
            this.formStatus = false;
        }
        return this.formStatus;
    }

date:Date = new Date();
public dataSource: any = [];

constructor(private contractService : ContractServService, private contractTypeService : ContractTypeServService, private route : ActivatedRoute,private datePipe: DatePipe) {
  const routeParams = this.route.snapshot.paramMap;
  this.tenantIdFromRoute = Number(routeParams.get('tenantId'));
  this.getArray();
  this.contractTypeService.getContractTypes().subscribe((response) => {
    this.contractTypes =response;
  });
  
}

ngOnInit():void {
    this.initForm();
}
ngAfterViewInit() {
}


/* Get the list of contracts by Main tenant Id */
getArray() {
    this.contractService.getContractsByMainTenantId(this.tenantIdFromRoute).subscribe((response) => 
    { this.dataSource = new MatTableDataSource<Contract>(response); });
}


/* Change the form's visibility */
btnClickActivateForm() {
    this.activateEditForm = true;
    this.initForm();
}
/* Close and initiate the form */
btnClose() {
    this.activateEditForm = false;
    this.initForm();
}

/* Initiate the form */
initForm() {
    this.newContractForm = new FormGroup(
      { id: new FormControl, 
        startDate: new FormControl('',Validators.required), 
        endDate: new FormControl, 
        contractType: new FormControl('LOGEMENT',Validators.required),
        contractStatus: new FormControl('ACTIF',Validators.required)
      })
}

/* Save the form
Contain contract + mainTenant */
contractFormSubmit(){
  if('VALID' === this.newContractForm.status){
    this.contract.id = this
        .newContractForm
        .controls['id']
        .value;
    this.contract.startDate = this
        .newContractForm
        .controls['startDate']
        .value;
    this.contract.endDate= this
        .newContractForm
        .controls['endDate']
        .value;
    this.contract.contractType = this
        .newContractForm
        .controls['contractType']
        .value;
    this.contract.contractStatus = this.newContractForm.controls['contractStatus'].value;
    
    this.mT.id = this.tenantIdFromRoute;

    this
        .contractService
        .saveContract(this.contract, this.mT)
        .subscribe((result) => {
            this.getArray();
            this.activateEditForm = false;
            this.ngOnInit();
            alert(constErrorMessage.contractSaved);
        }, (error) => {
            alert(constErrorMessage.saveImpossible);
        });
    }else{
        alert(constErrorMessage.saveIncomplete);
    }

}  
   

  /** Manage the table filter */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  /** Insert into the form the contract values */
  btnSeeContractDetail(contract:Contract){
      this.activateEditForm=true;
      this.newContractForm.controls['startDate'].setValue(this.datePipe.transform(contract.startDate, 'yyyy-MM-dd'));
      this.newContractForm.controls['endDate'].setValue(this.datePipe.transform(contract.endDate, 'yyyy-MM-dd'));
      this.newContractForm.controls['contractType'].setValue(contract.contractType);
      this.newContractForm.controls['id'].setValue(contract.id);
      this.newContractForm.controls['contractStatus'].setValue(contract.contractStatus)
  }

  /** Delete the current contract by Id */
  btnDeleteContract(id:number){
    this
    .contractService
    .deleteContract(id)
    .subscribe((response) => {
        alert(constErrorMessage.contractDeleted);
        this.ngOnInit();
        this.getArray();
    }, (error) => {
        alert(constErrorMessage.saveImpossible);
    })
  }
  
}