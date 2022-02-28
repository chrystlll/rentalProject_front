import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from 'src/app/_models/address.model';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {

  /* variable for managing Address section (right) */
  newAddressForm !: FormGroup;
  address: Address;
  listAddress : Address[] = [];
  
  constructor() { 
    
    this.address = new Address();
  }

  ngOnInit(): void {
    
    this.newAddressForm = new FormGroup(
      {address1: new FormControl(), address2: new FormControl(), zipCode: new FormControl(), city: new FormControl(), isPrimary: new FormControl()}
  );
  }

  



}
