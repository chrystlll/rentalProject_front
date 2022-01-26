import { Component, OnInit,  Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

  tenantIdFromRoute: any;

  constructor(private route: ActivatedRoute) { 
    // First get the tenant id from the current route.
  const routeParams = this.route.snapshot.paramMap;
  this.tenantIdFromRoute = Number(routeParams.get('tenantId'));

  // Find the tenant that correspond with the id provided in route.
  //this.tenantId = tenants.find(tenant => tenant.id === tenantIdFromRoute);

  }

  ngOnInit(): void {


  }

}
