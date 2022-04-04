import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {Price} from 'src/app/_models/price.model';
import {PriceServService} from 'src/app/_services/price-serv.service';
import * as constErrorMessage from 'src/app/_components/_utils/constErrorMessage';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contract} from 'src/app/_models/contract.model';

@Component(
    {selector: 'app-contract-price', templateUrl: './contract-price.component.html', styleUrls: ['./contract-price.component.css']}
)
export class ContractPriceComponent implements OnInit {

    @ViewChild(MatPaginator)paginator: MatPaginator | any;
    public displayedColumns = ['', '', '', '', ''];
    public dataSource: any;
    price: Price;
    contractIdFromRoute: number;

    newPriceForm !: FormGroup;
    formStatus: boolean = false;
    activateEditForm: boolean = false;

    isMandatory = constErrorMessage.isMandatory;
    dateInfError = constErrorMessage.dateInfError;

    constructor(
        private priceService : PriceServService,
        private route : ActivatedRoute,
    ) {
        const routeParams = this.route.snapshot.paramMap;
        this.contractIdFromRoute = Number(routeParams.get('contractId'));

        this.displayedColumns = [
            'id',
            'startDate',
            'endDate',
            'amount',
            'currency',
            'delete'
        ];
        this.initForm();
        this.price = new Price();
    }

    ngOnInit(): void {
        this.getArray();
    }

    /**  Delete the current price
  */
    btnDeletePrice(id : number) {
        this
            .priceService
            .deletePriceById(id)
            .subscribe((response) => {
                alert(constErrorMessage.priceDeleted);
                this.ngOnInit();
            })
    }

    /**  Edit the current price
  */
    btnEditPrice(id : number) {}

    btnClickActivateForm() {
        this.activateEditForm = true;
    }

    /**  Get all prices where contractId = contractIdFromRoute (current contract id)
  */
    private getArray() {
        this
            .priceService
            .getPriceByContractId(this.contractIdFromRoute)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Price>(response);
            });
    }

    /* Manage the form validity*/
    /* convenience getter for easy access
      to mainTenant form fields (left section)*/
    get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newPriceForm.controls;
    };

    /* check if the form is valid*/
    get formStatusValue() {
        if ('VALID' === this.newPriceForm.status) {
            this.formStatus = true;
        } else {
            this.formStatus = false;
        }
        return this.formStatus;
    }

    /* Close and initiate the form */
    btnClose() {
        this.activateEditForm = false;
        this.initForm();
    }

    /* Initiate the form */
    initForm() {
        this.newPriceForm = new FormGroup({
            id: new FormControl,
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl,
            amount: new FormControl('', Validators.required),
            currency: new FormControl('€', Validators.required)
        })
    }

    priceFormSubmit() {

        this.price.id = this
            .newPriceForm
            .controls['id']
            .value;
        this.price.startDate = this
            .newPriceForm
            .controls['startDate']
            .value;
        this.price.endDate = this
            .newPriceForm
            .controls['endDate']
            .value;
        this.price.amount = this
            .newPriceForm
            .controls['amount']
            .value;
        this.price.currency = this
            .newPriceForm
            .controls['currency']
            .value;

        console.log(this.price.id)
        const contract: Contract = new Contract();
        contract.id = this.contractIdFromRoute;

        if (contract.startDate > contract.endDate && null != contract.endDate ) {
            this
                .priceService
                .savePrice(this.price, contract)
                .subscribe((response) => {
                    this.ngOnInit();
                    this.activateEditForm = false;
                });
        } 
    }

}