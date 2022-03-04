import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component(
    {selector: 'app-tenant-details', providers: [DatePipe], templateUrl: './tenant-details.component.html', styleUrls: ['./tenant-details.component.css']}
)
export class TenantDetailsComponent implements OnInit {

    tenantIdFromRoute: any;

    constructor(private route : ActivatedRoute) {
        const routeParams = this.route.firstChild.params;
        routeParams.subscribe(params => {
            this.tenantIdFromRoute = params['tenantId'];

        })
    }

    ngOnInit(): void {}

}
