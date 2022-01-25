import { Component, OnInit ,ViewChild} from '@angular/core';

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
  getFormValues(valGender:string, valSurname:string, valFirstName:string, valEmail:string, valPhone:string, valDOB:string){
    console.warn(valGender, valSurname, valFirstName,valEmail ,valPhone ,valDOB);
  }

}
