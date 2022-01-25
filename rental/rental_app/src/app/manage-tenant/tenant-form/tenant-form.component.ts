import { Component, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css']
})
export class TenantFormComponent implements OnInit {


  constructor() {     
  }

  ngOnInit(): void {
  }

  // Date Picker properties
  datePickerConfig ={
    showWeekNumbers : false,
    format  : "YYYY-MM-DD"
  }

  // Management of Form
  tenantData:any={};
  tenantFormSubmit(data:NgForm){
    console.log(data);
    this.tenantData=data
  }

}
