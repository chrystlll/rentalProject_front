import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/_models/contract.model';
import { MainTenant } from 'src/app/_models/main-tenant.model';
import { ContractServService } from 'src/app/_services/contract-serv.service';
import { MainTenantServService } from 'src/app/_services/main-tenant-serv.service';
import * as constErrorMessage from 'src/app/_components/_utils/constErrorMessage';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.css']
})
export class ContractTableComponent implements OnInit {

    @ViewChild(MatPaginator)paginator: MatPaginator | any;

    public displayedColumns = [
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ];
    public dataSource: any;

    /** Manage the pagination */
    public pageSize = 5;
    public currentPage = 0;
    public totalSize = 0;
    public array: any;
    typeContract: string;

    constructor(
        private contractService : ContractServService,
        private tenantService : MainTenantServService,
        private router : Router,
        private route : ActivatedRoute
    ) {

        this.displayedColumns = [
            'id',
            'mainTenant',
            'startDate',
            'endDate',
            'contractType',
            'details',
            'delete'
        ];

    }

    ngOnInit(): void {
        this.getArray();
    }

    /**  Get all contracts where commonStatus = Active
  */
    private getArray() {
        const routeParams = this.route.snapshot.paramMap;
        this.typeContract = routeParams.get('contractStatus');
        this
            .contractService
            .getContractByStatus(this.typeContract)
            .subscribe((response) => {
                Array
                    .from(response)
                    .forEach((element : Contract) => {
                        this
                            .tenantService
                            .getMainTenantByContractId(element.id)
                            .subscribe((mT : MainTenant) => {
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
    btnSeeContractDetail(contractId : any) {
        this
            .router
            .navigate(['/contractDet/contractInfo', contractId]);
    }

    /**  Delete current contract
  */
    btnDeleteContract(id : number) {
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
