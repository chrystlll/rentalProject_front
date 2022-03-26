import {Component, OnInit} from '@angular/core';
import {MainTenant} from 'src/app/_models/main-tenant.model';
import {MainTenantServService} from 'src/app/_services/main-tenant-serv.service'
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import {Router} from '@angular/router';
import Utils from 'src/app/_components/_utils/fctUtils';
import * as constErrorMessage from 'src/app/_components/_utils/constErrorMessage';

@Component(
    {selector: 'app-tenant-form', templateUrl: './tenant-form.component.html', styleUrls: ['./tenant-form.component.css']}
)

export class TenantFormComponent implements OnInit {

    // General properties
    newMainTenantForm !: FormGroup;
    mT = new MainTenant();
    formStatus: boolean = false;
    lastName: any;
    firstName: any;
    email: any;
    isExist: boolean | undefined;
    isError: boolean | undefined;

    
    // Errors
    isMandatory = constErrorMessage.isMandatory;
    isValidEmail = constErrorMessage.isValidEmail
    isValidPhone = constErrorMessage.isValidPhone
    isValidSocialNumber = constErrorMessage.isValidSocialNumber
    isValidDate = constErrorMessage.isValidDate;
    
    form = Utils.form(this.newMainTenantForm);
    formStatusValue = Utils.formStatusValue(this.newMainTenantForm, this.formStatus);
    
    constructor(
        private mainTenantServ : MainTenantServService,
        private router : Router
    ) {}

    ngOnInit(): void {
        this.isExist = false;
        this.newMainTenantForm = new FormGroup({
            firstName: new FormControl,
            dob: new FormControl,
            gender: new FormControl,
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phoneNumber1: new FormControl(
                '',
                [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]
            ),
            social: new FormControl('', [Validators.pattern(
                    '^[1-478][0-9]{2}(0[1-9]|1[0-2]|62|63)(2[ABab]|[0-9]{2})(00[1-9]|0[1-9][0-9]|[1' +
                    '-8][0-9]{2}|9[0-8][0-9]|990)(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})(0[1-9]|[1-8][0' +
                    '-9]|9[0-7])$'
                )])
        });
    };

    

    /* Submit MainTenant Data*/
    tenantFormSubmit() {
        if (
            null != this.newMainTenantForm.get("gender")
                ?.value
        ) {
            this.mT.gender = this
                .newMainTenantForm
                .get("gender")
                    ?.value
        };
        if (
            null != this.newMainTenantForm.get("firstName")
                ?.value
        ) {
            this.mT.firstName = this
                .newMainTenantForm
                .get("firstName")
                    ?.value
        };
        if (
            null != this.newMainTenantForm.get("lastName")
                ?.value
        ) {
            this.mT.lastName = this
                .newMainTenantForm
                .get("lastName")
                    ?.value
        };
        if (
            null != this.newMainTenantForm.get("phoneNumber1")
                ?.value
        ) {
            this.mT.phoneNumber1 = this
                .newMainTenantForm
                .get("phoneNumber1")
                    ?.value
        };
        if (
            null != this.newMainTenantForm.get("dob")
                ?.value
        ) {
            this.mT.dob = this
                .newMainTenantForm
                .get("dob")
                    ?.value
        };
        if (
            null != this.newMainTenantForm.get("email")
                ?.value
        ) {
            this.mT.email = this
                .newMainTenantForm
                .get("email")
                    ?.value
        };
        if (
            null != this.newMainTenantForm.get("social")
                ?.value
        ) {
            this.mT.socialNumber = this
                .newMainTenantForm
                .get("social")
                    ?.value
        };
        this.mT.mainTenantStatus = "ACTIF";
        

        if (this.formStatusValue) {

            // search if mainTenant exists with the email else create

            this
                .mainTenantServ
                .getMainTenantByEmail(this
                  .newMainTenantForm
                  .get("email")
                      ?.value)
                .subscribe((result:any|boolean) => {
                    this.isExist = result;
                    if (false === this.isExist) {
                        this.mainTenantServ.saveMainTenant(this.mT).subscribe(result => {
                                alert(constErrorMessage.dataSaved);
                                this.router.navigate(['/', 'tenant']);
                            }, error => {
                                console.error('There was an error!', error.status);
                                switch (error.status) {
                                    case 0:
                                        {
                                            alert(constErrorMessage.saveApiError);
                                            break;
                                        }
                                    default:
                                        {
                                            alert(constErrorMessage.saveImpossible);
                                            break;
                                        }
                                }
                            });
                    } else {
                            alert(constErrorMessage.emailStillExist);
                        
                    }
                }, error => {
                  alert(
                    constErrorMessage.saveImpossible
                );})   


            
        }else {
          alert(constErrorMessage.saveInfoIncorrect);
      }
    }
}
