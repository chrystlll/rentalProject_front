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

  // user example

  users =[
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
