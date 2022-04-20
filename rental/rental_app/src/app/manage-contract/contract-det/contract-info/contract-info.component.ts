import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumType } from 'src/app/_models/enumType.model';
import { EnumTypeServService } from 'src/app/_services/enum-serv.service';
import * as constMessage from 'src/app/_utils/constMessage';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/_models/contract.model';
import { ContractServService } from 'src/app/_services/contract-serv.service';
import { MainTenant } from 'src/app/_models/main-tenant.model';
import { DatePipe } from '@angular/common';
import { Place } from 'src/app/_models/place.model';
import { Vehicle } from 'src/app/_models/vehicle';


@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.css']
})
export class ContractInfoComponent implements OnInit {

        newContractForm?: FormGroup;
        editableStatus: boolean = false;
        contractTypes: EnumType[];
        contractIdFromRoute: any;
        contract: Contract = new Contract;
        formStatus: boolean = false;
        place:Place;
        vehicles:Vehicle[];
        isMandatory = constMessage.isMandatory;

        constructor(
            private enumTypeService : EnumTypeServService,
            private datePipe : DatePipe,
            private route : ActivatedRoute,
            private contractSer : ContractServService
        ) {
            const routeParams = this.route.snapshot.paramMap;
            this.contractIdFromRoute = Number(routeParams.get('contractId'));
            this
                .enumTypeService
                .getContractTypes()
                .subscribe((response) => {
                    this.contractTypes = response;
                });

            this
                .contractSer
                .getContractById(this.contractIdFromRoute)
                .subscribe((response) => {
                    this.contract = response;
                    if (undefined != this.contract.startDate) {
                        this
                            .newContractForm
                            .controls['startDate']
                            .setValue(this.datePipe.transform(this.contract.startDate, 'yyyy-MM-dd'));
                    }
                    this
                        .newContractForm
                        .controls['endDate']
                        .setValue(this.contract.endDate);
                    this
                        .newContractForm
                        .controls['commonStatus']
                        .setValue(
                            this.contract
                                ?.commonStatus
                        );

                    this
                        .newContractForm
                        .controls['contractType']
                        .setValue(this.contract.contractType);

                });

        }

        ngOnInit(): void {
            this.newContractForm = new FormGroup({
                id: new FormControl(this.contractIdFromRoute),
                startDate: new FormControl('', [Validators.required]),
                endDate: new FormControl(),
                commonStatus: new FormControl('', [Validators.required]),
                contractType: new FormControl('', [Validators.required])
            })

        }

        /* update the contract information */
        contractFormSubmit() {
            if (this.formStatusValue) {
                this.contract.id = this.contractIdFromRoute;
                if (this.newContractForm.controls["startDate"].value) {
                    this.contract.startDate = this
                        .newContractForm
                        .controls['startDate']
                        .value;
                } else {
                    this.contract.id = undefined;
                }

                if (this.newContractForm.controls["endDate"].value) {
                    this.contract.endDate = this
                        .newContractForm
                        .controls['endDate']
                        .value;
                } else {
                    this.contract.endDate = undefined;
                }

                if (this.newContractForm.controls["commonStatus"].value) {
                    this.contract.commonStatus = this
                        .newContractForm
                        .controls['commonStatus']
                        .value;
                } else {
                    this.contract.commonStatus = undefined;
                }

                if (this.newContractForm.controls["contractType"].value) {
                    this.contract.contractType = this
                        .newContractForm
                        .controls['contractType']
                        .value;
                } else {
                    this.contract.contractType = undefined;
                }

                const mainTenant: MainTenant = undefined;

                this
                    .contractSer
                    .saveContract(this.contract, mainTenant)
                    .subscribe((response) => {
                        alert(constMessage.dataSaved);
                        this.editableStatus = false;
                    }, (error) => {
                        alert(constMessage.saveImpossible);
                    });
            } else {
                alert(constMessage.saveInfoIncorrect);
            }
        }

        /* convenience getter for easy access
            to contract form fields*/
        get form(): {
            [key: string]: AbstractControl;
        } {
            return this.newContractForm.controls;
        };

        /* check if the contract form is valid*/
        get formStatusValue() {
            if ('VALID' === this.newContractForm.status) {
                this.formStatus = true;
            } else {
                this.formStatus = false;
            }
            return this.formStatus;
        }
  
  }