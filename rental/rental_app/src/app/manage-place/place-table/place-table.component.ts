import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/_models/place.model';
import { MainTenantServService } from 'src/app/_services/main-tenant-serv.service';
import { PlaceServService } from 'src/app/_services/place-serv.service';
import * as constMessage from 'src/app/_utils/constMessage';

@Component({
  selector: 'app-place-table',
  templateUrl: './place-table.component.html',
  styleUrls: ['./place-table.component.css']
})
export class PlaceTableComponent implements OnInit {

  @ViewChild(MatPaginator)paginator: MatPaginator | any;

    public displayedColumns = [
        
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
    typePlace: string;

    constructor(
        private placeService : PlaceServService,
        private tenantService : MainTenantServService,
        private router : Router,
        private route : ActivatedRoute
    ) {

        this.displayedColumns = [
            'id',
            'name',
            'commonStatus',
            'locationSize',
            'details',
            'delete'
        ];

    }

    ngOnInit(): void {
        this.getArray();
    }

    /**  Get all places where commonStatus = Active
  */
    private getArray() {
        const routeParams = this.route.snapshot.paramMap;
        this.typePlace = routeParams.get('placeStatus');
        this
            .placeService
            .getPlaceByStatus(this.typePlace)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Place>(response);
                this.dataSource.paginator = this.paginator;
                this.array = response;
                this.totalSize = this.array.length;
                this.iterator();
            });
    }

    /**  Check place details
  */
    btnSeePlaceDetail(placeId : any) {
        this
            .router
            .navigate(['/placeDet/placeInfo', placeId]);
    }

    /**  Delete current place
  */
    btnDeletePlace(id : number) {
        this
            .placeService
            .deletePlace(id)
            .subscribe(() => {
                alert(constMessage.placeDeleted);
                this.ngOnInit();
                this.getArray();
            }, () => {
                alert(constMessage.saveImpossible);
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
