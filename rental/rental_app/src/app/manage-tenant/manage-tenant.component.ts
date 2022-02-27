import {Router} from '@angular/router';
import {MainTenant} from '../_models/main-tenant.model';
import {MainTenantServService} from '../_services/main-tenant-serv.service';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component(
    {selector: 'app-manage-tenant', templateUrl: './manage-tenant.component.html', styleUrls: ['./manage-tenant.component.css']}
)

export class ManageTenantComponent implements OnInit,
AfterViewInit {

    @ViewChild(MatPaginator)paginator: MatPaginator | any;

    public array: any;
    public displayedColumns = ['', '', '', '', ''];
    public dataSource: any;

    public pageSize = 5;
    public currentPage = 0;
    public totalSize = 0;
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

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
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

    ngOnInit(): void {}

    btnClickTenantForm() {
        this
            .router
            .navigate(['/', 'tenantForm']);
    }

    btnDeleteTenant(id : number) {
        console.log(id);
        this
            .mainTenantServ
            .deleteMainTenantById(id)
            .subscribe((result) => {
                alert("Le locataire a bien été supprimé.");
                this.dataSource = this
                    .dataSource
                    .filter((item : {
                        id: number;
                    }) => item.id !== id);
                this.getArray();
                this.ngOnInit();
            }, (error) => {
                alert("La suppression est impossible, veuillez réessayer ultérieurement");
            });
    }

    btnSeeTenantDetail(tenantId : any) {
        this
            .router
            .navigate(['/tenantDetails', tenantId]);

    }

}
