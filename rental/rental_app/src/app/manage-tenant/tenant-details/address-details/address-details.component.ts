import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Address} from 'src/app/_models/address.model';
import {CSVCodePostalRecord} from 'src/app/_models/csv-code-postal.model';
import {MainTenant} from 'src/app/_models/main-tenant.model';
import {AddressServService} from 'src/app/_services/address-serv.service';
import {ReadCSVServService} from 'src/app/_services/read-csvserv.service';
import * as constMessage from 'src/app/_utils/constMessage';

@Component(
    {selector: 'app-address-details', templateUrl: './address-details.component.html', styleUrls: ['./address-details.component.css']}
)
export class AddressDetailsComponent implements OnInit,
AfterViewInit {

    @ViewChild(MatPaginator)paginator: MatPaginator | any;
    newAddressForm !: FormGroup;
    editableStatus: boolean = false;
    address1: string;
    address2: string;
    tenantIdFromRoute: any;
    activateEditForm: boolean = false;
    address: Address = new Address;
    mT: MainTenant = new MainTenant();
    formStatus: boolean = false;

    public dataSource: any = [];
    public displayedColumns = [
        '',
        '',
        '',
        '',
        '',
        ''
    ];
    public array: any;

    /** Manage the pagination */
    public pageSize = 5;
    public totalSize = 0;
    public currentPage = 0;
    private iterator() {
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        const part = this
            .array
            .slice(start, end);
        this.dataSource = part;
    }

    /** Manage the zipCode /city link */
    public records: CSVCodePostalRecord[] = [];
    private _csvURL = 'assets/document/laposte_hexasmal.csv';
    currentItem: any;

    isMandatory = constMessage.isMandatory;

    constructor(
        private route : ActivatedRoute,
        private addressService : AddressServService,
        private readCSVserv : ReadCSVServService
    ) {
        const routeParams = this.route.snapshot.paramMap;
        this.tenantIdFromRoute = Number(routeParams.get('tenantId'));
        this.getArray();
        this.displayedColumns = [
            'id',
            'address1',
            'address2',
            'zipCode',
            'city',
            'isPrimary',
            'details',
            'delete'
        ];
    }
    private getArray() {
        this
            .addressService
            .getAddressesByMainTenantId(this.tenantIdFromRoute)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Address>(response);
                this.dataSource.paginator = this.paginator;
                this.array = response;
                this.totalSize = this.array.length;
                this.iterator();
            });
    }

    ngOnInit(): void {
        this.initForm();

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    /** Manage the access to the csv file witch contains the zipCode and the relative city names
     * Note: this file is not deduplicate
    */
    getDataRecordsArrayFromCSVFile(
        csvRecordsArray : any,
        headerLength : any,
        searchString : string
    ) {
        let csvArr: any[] = [];
        
        for (let i = 1; i < csvRecordsArray.length; i++) {
            let isExist=undefined;
            let curruntRecord = (csvRecordsArray[i]).split(';');
            let csvRecord: CSVCodePostalRecord = new CSVCodePostalRecord();
            csvRecord.Nom_commune = curruntRecord[1].trim();
            csvRecord.Code_postal = curruntRecord[2].trim();
            csvArr.push(csvRecord);
            
        }
        if (!searchString && !searchString.trim()) {
            return of(csvArr);
        } else {
            let wholeCity = [...csvArr];
            let filterdCities = wholeCity.filter(
                x => x.Code_postal.toLowerCase().indexOf(searchString.toLowerCase()) > -1
            );

            /** Deduplicate the data by Nom_Commune value */
            let reduceCity = [...filterdCities];
            let reducelist = reduceCity.filter(
                (test, index, array) => index === array.findIndex((findTest) => findTest.Nom_commune === test.Nom_commune)
            );

            return of(reducelist);
        }

    }

    /** Manage the access to the header of the csv file witch contains the zipCode and the relative city names
    */
    getHeaderArray(csvRecordsArr : any) {
        let headers = (<string> csvRecordsArr[0]).split(',');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    /** Manage the access to the csv file witch contains the zipCode and the relative city names
     * This function is called when an user completes the zipCode input 
     * (the relative cities can be selected in the city list)
    */
    searchRelativeCities(event : any) {
        if (event.value.length === 5) {
            this
                .readCSVserv
                .getInfo(this._csvURL)
                .subscribe((response) => {
                    let csvData = response;
                    let csvRecordsArray = (<string> csvData).split(/\r\n|\n/);
                    let headersRow = this.getHeaderArray(csvRecordsArray);
                    //filter
                    this
                        .getDataRecordsArrayFromCSVFile(
                            csvRecordsArray,
                            headersRow.length,
                            event.value
                        )
                        .subscribe((response) => {
                            this.records = response;
                        });

                });
        }
    }

    /* convenience getter for easy access
      to address form fields (left section)*/
    get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newAddressForm.controls;
    };

    public handlePage(e : any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.iterator();
    }

    /* Delete the current address by Id */
    btnDeleteAddress(id : any) {
        this
            .addressService
            .deleteAddress(id)
            .subscribe((response) => {
                alert(constMessage.adressDeleted);
                this.ngOnInit();
                this.getArray();
            }, (error) => {
                alert(constMessage.saveImpossible);
            })
    }

    /* Copy the current address informations on the form 
    and activate the form */
    btnSeeAddressDetail(address : Address) {
        
        this.activateEditForm = true;
        console.log(address);
        this
            .newAddressForm
            .controls['id']
            .setValue(address.id);
        this
            .newAddressForm
            .controls['address1']
            .setValue(address.address1);
        this
            .newAddressForm
            .controls['address2']
            .setValue(address.address2);
        this
            .newAddressForm
            .controls['zipCode']
            .setValue(address.zipCode);

            let csvRecord: CSVCodePostalRecord = new CSVCodePostalRecord();
            csvRecord.Nom_commune = address.city;
            csvRecord.Code_postal = address.zipCode;
            this.records.push(csvRecord);

            this
            .newAddressForm
            .controls['city']
            .setValue(address.city);

            this
            .newAddressForm
            .controls['country']
            .setValue(address.country);
        
        if (true === address.isPrimary) {
            this
                .newAddressForm
                .controls['isPrimary']
                .setValue("TRUE");
        } else {
            this
                .newAddressForm
                .controls['isPrimary']
                .setValue("FALSE");
        }
    }

    /* Change the form's visibility */
    btnClickActivateForm() {
        this.activateEditForm = true;
        this.initForm();
    }

    /* Close and initiate the form */
    btnClose() {
        this.activateEditForm = false;
        this.initForm();
    }


    addressFormSubmit() {
        if('VALID' === this.newAddressForm.status){
        this.address.id = this
            .newAddressForm
            .controls['id']
            .value;
        this.address.address1 = this
            .newAddressForm
            .controls['address1']
            .value;
        this.address.address2 = this
            .newAddressForm
            .controls['address2']
            .value;
        this.address.city = this
            .newAddressForm
            .controls['city']
            .value;
        this.address.country = this
            .newAddressForm
            .controls['country']
            .value;
        this.address.isPrimary = this
            .newAddressForm
            .controls['isPrimary']
            .value;
        this.address.zipCode = this
            .newAddressForm
            .controls['zipCode']
            .value;
        this.mT.id = this.tenantIdFromRoute;

        this
            .addressService
            .saveAddress(this.address, this.mT)
            .subscribe((result) => {
                this.getArray();
                this.activateEditForm = false;
                this.ngOnInit();
                alert(constMessage.dataSaved);
            }, (error) => {
                alert(constMessage.saveImpossible);
            });
        }else{
            alert(constMessage.saveIncomplete);
        }
    }

     /* Initiate the form */ 
    initForm() {
        this.newAddressForm = new FormGroup({
            id: new FormControl,
            address1: new FormControl('',Validators.required),
            address2: new FormControl,
            zipCode: new FormControl(
                '',
                [Validators.maxLength(5) || Validators.minLength(5) || Validators.required]
            ),
            city: new FormControl('',Validators.required),
            country: new FormControl('FRANCE'),
            isPrimary: new FormControl("TRUE",Validators.required)
        });
    }

    /* Check the validity of the form */ 
    get formStatusValue() {
        if ('VALID' === this.newAddressForm.status) {
            this.formStatus = true;
        } else {
            this.formStatus = false;
        }
        return this.formStatus;
    }

}
