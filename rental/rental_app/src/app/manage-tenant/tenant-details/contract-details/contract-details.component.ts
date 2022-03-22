import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/_models/contract.model';
import { MainTenant } from 'src/app/_models/main-tenant.model';
import { ContractServService } from 'src/app/_services/contract-serv.service';


@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit, AfterViewInit  {

activateEditForm: boolean = false;
newContractForm !: FormGroup;
formStatus: boolean = false;
displayedColumns: string[] = ['startDate', 'endDate', 'contractType'];
tenantIdFromRoute: any;
contract: Contract = new Contract;
mT: MainTenant = new MainTenant();

@ViewChild(MatSort) sort: MatSort;

isMandatory = 'Ce champ est obligatoire';
contractTypes = [
  {"id":"LOGEMENT","name":"LOGEMENT"},
  {"id":"AUTRE_STOCKAGE","name":"AUTRE STOCKAGE"},
  {"id":"STOCKAGE_BATEAU","name":"STOCKAGE BATEAU"},
  {"id":"STOCKAGE_VOITURE","name":"STOCKAGE VOITURE"},
  {"id":"STOCKAGE_CAMPING_CAR","name":"STOCKAGE CAMPING CAR"},
  {"id":"STOCKAGE_CARAVANE","name":"STOCKAGE CARAVANE"},
  {"id":"STOCKAGE_MOTO","name":"STOCKAGE MOTO"}];

  date:Date = new Date();
  public dataSource: any = [];


constructor(private contractService : ContractServService, private route : ActivatedRoute,) {
  const routeParams = this.route.snapshot.paramMap;
  this.tenantIdFromRoute = Number(routeParams.get('tenantId'));
  this.getArray();
  
}

ngOnInit():void {
    this.initForm();
}
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}

/* Get the list of contracts by Main tenant Id */
getArray() {
  this
            .contractService
            .getContractsByMainTenantId(this.tenantIdFromRoute)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Contract>(response);
            });
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
        contractType: new FormControl('LOGEMENT',Validators.required)
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

        console.log(this
          .newContractForm
          .controls['contractType']
          .value);
        console.log(this.contract);
    
    this.mT.id = this.tenantIdFromRoute;

    this
        .contractService
        .saveContract(this.contract, this.mT)
        .subscribe((result) => {
            this.getArray();
            this.activateEditForm = false;
            this.ngOnInit();
            alert("Contrat sauvegardé.");
        }, (error) => {
            alert("Sauvegarde Impossible!! Veuillez réessayer ultérieurement");
        });
    }else{
        alert("Merci de compléter les informations manquantes");
    }

}

/* convenience getter for easy access
      to address form fields (left section)*/
      get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newContractForm.controls;
    };

    /* Check the validity of the form */ 
    get formStatusValue() {
      if ('VALID' === this.newContractForm.status) {
          this.formStatus = true;
      } else {
          this.formStatus = false;
      }
      return this.formStatus;
  }

  /** Manage the table filter */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}