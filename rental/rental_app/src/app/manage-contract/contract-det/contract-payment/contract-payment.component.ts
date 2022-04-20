import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import * as validators from 'src/app/_directives/custom-validator.directive';
import {ScheduledPayment} from 'src/app/_models/scheduledPayment.model';
import * as constMessage from 'src/app/_utils/constMessage';
import {PaymentServService} from 'src/app/_services/payment-serv.service';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {Contract} from 'src/app/_models/contract.model';
import {DatePipe} from '@angular/common';
import {ContractServService} from 'src/app/_services/contract-serv.service';
import {UtilsServService} from 'src/app/_services/utils-serv.service';
import {Price} from 'src/app/_models/price.model';
import {PriceServService} from 'src/app/_services/price-serv.service';

@Component(
    {selector: 'app-contract-payment', templateUrl: './contract-payment.component.html', styleUrls: ['./contract-payment.component.css']}
)
export class ContractPaymentComponent implements OnInit {
    @Input() contract: Contract;
    @ViewChild(MatPaginator)paginator: MatPaginator | any;
    public displayedColumns = [
        '',
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
    payment: ScheduledPayment;
    contractIdFromRoute: number;
    
    price: Price;
    formStatus: boolean = false;
    activateEditForm: Boolean = false;
    newPaymentForm !: FormGroup;
    priceForm !: FormGroup;
    isMandatory = constMessage.isMandatory;
    dateInfError = constMessage.dateInfError;

    isInactivePayment:boolean = false;

    constructor(
        private paymentService : PaymentServService,
        private contractService : ContractServService,
        private route : ActivatedRoute,
        private datePipe : DatePipe,
        private utilsServ : UtilsServService,
        private priceServ : PriceServService
    ) {
        this.displayedColumns = [
            'id',
            'scheduledPaymentGenerationDate',
            'amount',
            'currency',
            'startDate',
            'endDate',
            'paymentType',
            'paymentDate',
            'details',
            'delete'
        ];

        const routeParams = this.route.snapshot.paramMap;
        this.contractIdFromRoute = Number(routeParams.get('contractId'));
        this
            .contractService
            .getContractById(this.contractIdFromRoute)
            .subscribe((response) => {
                this.contract = response;
            })
        this.initPaymentForm();
        this.initPriceForm();
        this.payment = new ScheduledPayment();
    }

    ngOnInit(): void {
        this.getArrayPayment("ACTIF");
        this.getArrayPrice();
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
        this.initPaymentForm();
    }

    /* Initiate the payment form */
    initPaymentForm() {
        this.newPaymentForm = new FormGroup({
            id: new FormControl,
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl,
            paymentDate: new FormControl('', Validators.required),
            paymentType: new FormControl('ESPECE', Validators.required),
            scheduledPaymentGenerationDate: new FormControl(
                this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
                Validators.required
            ),
            amount: new FormControl('')
        }, {validators: validators.forbiddenDateValidator()});
    }

    /* Initiate the price form */
    initPriceForm(){
        this.priceForm = new FormGroup({
            id: new FormControl,
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl,
            currency: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required),
            durationType: new FormControl('')
        }, {validators: validators.forbiddenDateValidator()});
    }

    /**  Get all prices where contractId = contractIdFromRoute (current contract id)
     * By status (status can be 'ACTIF' or 'INACTIVE')
    */
    private getArrayPayment(status:String) {
        this
            .paymentService
            .getPaymentByContractId(this.contractIdFromRoute)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<ScheduledPayment>(response);
            });
    }

    /* Init the price arraylist*/
    private getArrayPrice() {
        this
            .priceServ
            .getPriceByContractIdAndStatus(this.contractIdFromRoute, "ACTIF")
            .subscribe((response) => {
                this.price = response;
                this
                    .priceForm
                    .controls['amount']
                    .setValue(this.price.amount);
                this
                    .priceForm
                    .controls['durationType']
                    .setValue(this.price.durationType);
                this
                    .priceForm
                    .controls['currency']
                    .setValue(this.price.currency);
                this
                    .priceForm
                    .controls['id']
                    .setValue(this.price.id);
                this
                    .priceForm
                    .controls['startDate']
                    .setValue(this.datePipe.transform(this.price.startDate, 'yyyy-MM-dd'));
                this
                    .priceForm
                    .controls['endDate']
                    .setValue(this.datePipe.transform(this.price.endDate, 'yyyy-MM-dd'));
            });

    }

    /* Save the payment form */
    paymentFormSubmit() {
        this.payment = new ScheduledPayment();
        this.payment.id = this
            .newPaymentForm
            .controls['id']
            .value;
        this.payment.endDate = this
            .newPaymentForm
            .controls['endDate']
            .value;
        this.payment.startDate = this
            .newPaymentForm
            .controls['startDate']
            .value;
        this.payment.paymentDate = this
            .newPaymentForm
            .controls['paymentDate']
            .value;
        this.payment.paymentType = this
            .newPaymentForm
            .controls['paymentType']
            .value;
        this.payment.scheduledPaymentGenerationDate = this
            .newPaymentForm
            .controls['scheduledPaymentGenerationDate']
            .value;
        this.payment.amount = this
            .newPaymentForm
            .controls['amount']
            .value;

        let contract = new Contract();
        contract.id = this.contractIdFromRoute;

        this
            .paymentService
            .savePayment(this.payment, contract)
            .subscribe((response) => {
                alert(constMessage.dataSaved);
                this.ngOnInit();
                this.initPaymentForm();
                this.activateEditForm = false;
            })
    }

    /** Delete the payment by id */
    btnDeletePayment(id : number) {
        this
            .paymentService
            .deletePaymentById(id)
            .subscribe((response) => {
                alert(constMessage.paymentDeleted)
            });
    }

    /** See the details of the payments*/
    btnSeePaymentDetail(payment : ScheduledPayment) {
        this
            .newPaymentForm
            .controls['id']
            .setValue(payment.id);
        this
            .newPaymentForm
            .controls['startDate']
            .setValue(this.datePipe.transform(payment.startDate, 'yyyy-MM-dd'));
        this
            .newPaymentForm
            .controls['endDate']
            .setValue(this.datePipe.transform(payment.endDate, 'yyyy-MM-dd'));
        this
            .newPaymentForm
            .controls['paymentDate']
            .setValue(this.datePipe.transform(payment.paymentDate, 'yyyy-MM-dd'));
        this
            .newPaymentForm
            .controls['paymentType']
            .setValue(payment.paymentType);
        this
            .newPaymentForm
            .controls['amount']
            .setValue(payment.amount);
        this
            .newPaymentForm
            .controls['scheduledPaymentGenerationDate']
            .setValue(
                this.datePipe.transform(payment.scheduledPaymentGenerationDate, 'yyyy-MM-dd')
            )
        this.activateEditForm = true;
    }

    btnSeeOldPayment() {
        this.isInactivePayment = true;
        // Init the payment array
        this.getArrayPayment("INACTIVE");

    }

    /** Update the end date depending of the contractType */
    setEndDate(event : Event) {
        const target = event.target as HTMLTextAreaElement;
        const contractType = this.contract.scheduledPaymentType;
        let responseDate: Date = new Date(target.value);
        this
            .utilsServ
            .calculateEndDate(responseDate, contractType)
            .subscribe(
                (response) => this.newPaymentForm.controls['endDate'].setValue(response)
            )
    }

    //Modify the price value if the user edit the price
    priceWasValidated(response: String): void {
        this.getArrayPrice();
    }
        
}
