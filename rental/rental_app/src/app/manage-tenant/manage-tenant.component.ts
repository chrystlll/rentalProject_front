import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainTenant } from '../_models/main-tenant.model';
import { MainTenantServService } from '../_services/main-tenant-serv.service';

@Component({
  selector: 'app-manage-tenant',
  templateUrl: './manage-tenant.component.html',
  styleUrls: ['./manage-tenant.component.css']
})
export class ManageTenantComponent implements OnInit {

  tenant:any;
  tenants!: MainTenant[];
  //item:MainTenant | undefined;

  constructor(private router: Router,private mainTenantServ: MainTenantServService) { 
    this.mainTenantServ.getMainTenants().subscribe(
      (result: MainTenant[]) =>  this.tenants =result)
  }

  ngOnInit(): void {
  }

  btnClickTenantForm() {
    this.router.navigate(['/', 'tenantForm']);
  }

  btnDeleteTenant(id:string|undefined){
    //this.tenants=this.tenants.filter(item=>item.id!==id);
    //alert("Item : " + id  + " is deleted ");
  }

  btnSeeTenantDetail(tenantId:any){
    this.router.navigate(['/tenantDetails',tenantId]);
    
  }
 
  
}
