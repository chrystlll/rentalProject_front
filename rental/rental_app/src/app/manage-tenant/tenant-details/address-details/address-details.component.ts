import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {Address} from 'src/app/_models/address.model';
import {MainTenant} from 'src/app/_models/main-tenant.model';
import {AddressServService} from 'src/app/_services/address-serv.service';

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

    public dataSource: any;
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

    isMandatory = 'Ce champs est obligatoire';

    constructor(
        private route : ActivatedRoute,
        private addressService : AddressServService
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

    /* CBN : to be implemented*/
    btnDeleteAddress(id : any) {
        console.log(id);
        this
            .addressService
            .deleteAddress(id)
            .subscribe((response) => {
                alert("Adresse supprimée.");
                this.ngOnInit();
                this.getArray();
            }, (error) => {
                alert("Sauvegarde Impossible!! Veuillez réessayer ultérieurement");
            })
    }

    /* CBN : to be implemented*/
    btnSeeAddressDetail(address : Address) {
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

        this.activateEditForm = true;
    }

    btnClickActivateForm() {
        this.activateEditForm = true;
        this.initForm();
    }

    btnClose() {
        this.activateEditForm = false;
        this.initForm();
    }

    /* CBN : to be implemented*/
    addressFormSubmit() {
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
                alert("Addresse sauvegardée.");
            }, (error) => {
                alert("Sauvegarde Impossible!! Veuillez réessayer ultérieurement");
            });
    }

    initForm() {
        this.newAddressForm = new FormGroup({
            id: new FormControl,
            address1: new FormControl,
            address2: new FormControl,
            zipCode: new FormControl,
            city: new FormControl,
            country: new FormControl('FRANCE'),
            isPrimary: new FormControl("TRUE")
        });
    }

}
