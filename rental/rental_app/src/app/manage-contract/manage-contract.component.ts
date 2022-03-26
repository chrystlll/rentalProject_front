import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Contract } from '../_models/contract.model';
import { MainTenant } from '../_models/main-tenant.model';
import { ContractServService } from '../_services/contract-serv.service';
import { MainTenantServService } from '../_services/main-tenant-serv.service';
import * as constErrorMessage from 'src/app/_components/_utils/constErrorMessage';

@Component({
  selector: 'app-manage-contract',
  templateUrl: './manage-contract.component.html',
  styleUrls: ['./manage-contract.component.css']
})



export class ManageContractComponent implements OnInit {
  
  
  @ViewChild(MatPaginator)paginator: MatPaginator | any;

  public displayedColumns = ['', '', '', '', '', '', ''];
  public dataSource: any;

  /** Manage the pagination */
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;

  constructor(private contractService:ContractServService,private tenantService:MainTenantServService,
    private router : Router) { 
    this.getArray();
    this.displayedColumns = [
      'id',
      'mainTenant',
      'startDate',
      'endDate',
      'contractType',
      'details',
      'delete'
  ];
  //this.dataSource = new MatTableDataSource<Contract>(this.dataSource);
  }

  ngOnInit():void {}


  /**  Get all contracts where contractStatus = Active
  */
  private getArray() {
    
    this
        .contractService
        .getContractByStatus('ACTIF')
        .subscribe((response) => {
          Array.from(response).forEach((element:Contract) => {
              this.tenantService.getMainTenantByContractId(element.id).subscribe((mT:MainTenant)=>{
                element.mainTenantfirstName = mT.lastName;
              })
            });
            
            this.dataSource = new MatTableDataSource<Contract>(response);          
            this.dataSource.paginator = this.paginator;
            this.array = response;
            this.totalSize = this.array.length;
            this.iterator();
        });
}


  /**  Check contract détails
  */
  btnSeeContractDetail(contractId:any){
    this
    .router
    .navigate(['/contractDet/contractInfo',contractId]);
  }

  /**  Check inactive contract
  */
  btnSeeOldContracts(){

  }

  /**  Delete current contract
  */
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


  public handlePage(e : any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this
        .array
        .slice(start, end);
    this.dataSource = part;
}

}
