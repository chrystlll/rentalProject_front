import {Router} from '@angular/router';
import {MainTenant} from '../_models/main-tenant.model';
import {MainTenantServService} from '../_services/main-tenant-serv.service';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import * as constErrorMessage from 'src/app/_utils/constErrorMessage';

@Component(
    {selector: 'app-manage-tenant', templateUrl: './manage-tenant.component.html', styleUrls: ['./manage-tenant.component.css']}
)

export class ManageTenantComponent implements OnInit,
AfterViewInit {

    @ViewChild(MatPaginator)paginator: MatPaginator | any;

    
    public displayedColumns = ['', '', '', '', ''];
    public dataSource: any;
    searchForm !: FormGroup;

    /** Manage the pagination */
    public pageSize = 5;
    public currentPage = 0;
    public totalSize = 0;
    public array: any;
    private iterator() {
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        const part = this
            .array
            .slice(start, end);
        this.dataSource = part;
    }

    constructor(
        private router : Router,
        private mainTenantServ : MainTenantServService
    ) {
        this.getArray();
        this.displayedColumns = [
            'id',
            'lastName',
            'firstName',
            'email',
            'statut',
            'details',
            'delete'
        ];
        this.dataSource = new MatTableDataSource<MainTenant>(this.dataSource);
    }

    public handlePage(e : any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.iterator();
    }

    private getArray() {
        this
            .mainTenantServ
            .getMainTenants()
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<MainTenant>(response);
                this.dataSource.paginator = this.paginator;
                this.array = response;
                this.totalSize = this.array.length;
                this.iterator();
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            searchByName: new FormControl('')
        });
    }

    btnClickTenantForm() {
        this
            .router
            .navigate(['/', 'tenantForm']);
    }

    /** Delete the current main tenant 
     */
    btnDeleteTenant(id : number) {
        console.log(id);
        this
            .mainTenantServ
            .deleteMainTenantById(id)
            .subscribe((result) => {
                alert(constErrorMessage.mainTenantDeleted);
                this.dataSource = this
                    .dataSource
                    .filter((item : {
                        id: number;
                    }) => item.id !== id);
                this.getArray();
                this.ngOnInit();
            }, (error) => {
                alert(constErrorMessage.saveImpossible);
            });
    }

    /** Access to main tenant details component
     * (tenant-details component)
     */
    btnSeeTenantDetail(tenantId : any) {
        this
            .router
            .navigate(['/tenantDetails/mainTenantDetails', tenantId]);
    }

    /** Reduce the list of main tenant
     * input = searchByName input content
     * CBN: to be implemented
     */
    btnSearchMainTenant(){
        console.log(this.searchForm.controls["searchByName"].value);
    }

}
