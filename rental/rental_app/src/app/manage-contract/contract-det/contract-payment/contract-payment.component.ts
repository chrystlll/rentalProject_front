import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import * as validators from 'src/app/_directives/custom-validator.directive';
import { Payment } from 'src/app/_models/payment.model';
import * as constErrorMessage from 'src/app/_utils/constErrorMessage';
import { PaymentServService } from 'src/app/_services/payment-serv.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/_models/contract.model';

@Component({
  selector: 'app-contract-payment',
  templateUrl: './contract-payment.component.html',
  styleUrls: ['./contract-payment.component.css']
})
export class ContractPaymentComponent implements OnInit {

  @ViewChild(MatPaginator)paginator: MatPaginator | any;
  public displayedColumns = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
  ];
  public dataSource: any;
  payment: Payment;
  contractIdFromRoute: number;
  
  formStatus: boolean = false;
  
  activateEditForm: Boolean = false;
  newPaymentForm !: FormGroup;

  isMandatory = constErrorMessage.isMandatory;
    dateInfError = constErrorMessage.dateInfError;

  constructor(private paymentService : PaymentServService,
    private route : ActivatedRoute) {
    this.displayedColumns = [
      'id',
      'startDate',
      'endDate',
      'paymentType',
      'paymentDate',
      'details',
      'delete'
  ];
      this.initForm();
      this.payment = new Payment();
      const routeParams = this.route.snapshot.paramMap;
      this.contractIdFromRoute = Number(routeParams.get('contractId'));
  }

  ngOnInit():void {
    this.getArray();
  }

  /* Manage the form validity*/
    /* convenience getter for easy access
      to mainTenant form fields (left section)*/
      get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newPaymentForm.controls;
    };

    /* check if the form is valid*/
    get formStatusValue() {
        if ('VALID' === this.newPaymentForm.status) {
            this.formStatus = true;
        } else {
            this.formStatus = false;
        }
        return this.formStatus;
    }

  btnClickActivateForm() {
      this.activateEditForm = true;
  }

  /* Close and initiate the form */
  btnClose() {
      this.activateEditForm = false;
      this.initForm();
  }

  /* Initiate the form */
  initForm() {
      this.newPaymentForm = new FormGroup({ 
        id: new FormControl, 
        startDate: new FormControl('', [Validators.required,]), 
        endDate: new FormControl, 
        paymentDate: new FormControl('', Validators.required), 
        paymentType: new FormControl('€', Validators.required), },
        { validators: validators.forbiddenDateValidator() })
  
  
    }

    /**  Get all prices where contractId = contractIdFromRoute (current contract id)
  */
     private getArray() {
      this
          .paymentService
          .getPaymentByContractId(this.contractIdFromRoute)
          .subscribe((response) => {
              this.dataSource = new MatTableDataSource<Payment>(response);
          });
  }

  /* Save the form */

  paymentFormSubmit() {
    this.payment = new Payment();
    this.payment.id = this.newPaymentForm.controls['id'].value;
    this.payment.endDate = this.newPaymentForm.controls['endDate'].value;
    this.payment.startDate = this.newPaymentForm.controls['startDate'].value;
    this.payment.paymentDate =this.newPaymentForm.controls['paymentDate'].value;
    this.payment.paymentType = this.newPaymentForm.controls['paymentType'].value;
 //   this.payment.price = this.newPaymentForm.controls['price'].value;

    let contract = new Contract();
    contract.id = this.contractIdFromRoute;

    this.paymentService.savePayment(this.payment,contract).subscribe((response)=>{
      alert(constErrorMessage.dataSaved);
      this.ngOnInit();
      this.initForm();
      this.activateEditForm = false;
    })
  }

  btnDeletePayment(id:number){

  }

  btnSeePaymentDetail(id:number){

  }

}
