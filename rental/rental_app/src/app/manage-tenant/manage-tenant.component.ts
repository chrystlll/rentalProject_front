import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tenant',
  templateUrl: './manage-tenant.component.html',
  styleUrls: ['./manage-tenant.component.css']
})
export class ManageTenantComponent implements OnInit {

  tenant:any;

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }

  btnClickTenantForm() {
    this.router.navigate(['/', 'tenantForm']);
  }

  btnDeleteTenant(id:number){
    this.tenants=this.tenants.filter(item=>item.id!==id);
    alert("Item : " + id  + " is deleted ");
  }

  btnSeeTenantDetail(tenantId:any){
    this.router.navigate(['/tenantDetails',tenantId]);
    
  }

  // user example
  tenants =[
    {
      id : 1 , 
      firstName:"toto",
      surname: "dupond",
      email : "toto.dupond@test.com"

    },
    {
      id : 2 , 
      firstName:"tata",
      surname: "dupand",
      email : "tata.dupand@test.com"

    },
    {
      id : 3 , 
      firstName:"titi",
      surname: "dipond",
      email : "titi.dipond@test.com"

    }
  ]


}
