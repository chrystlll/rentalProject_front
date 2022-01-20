import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tenant',
  templateUrl: './manage-tenant.component.html',
  styleUrls: ['./manage-tenant.component.css']
})
export class ManageTenantComponent implements OnInit {

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }

  btnClickTenantForm() {
    this.router.navigate(['/', 'tenantForm']);
  }


}