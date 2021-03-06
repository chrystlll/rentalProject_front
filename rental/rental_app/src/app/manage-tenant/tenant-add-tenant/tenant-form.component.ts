import {Component, OnInit} from '@angular/core';
import {MainTenant} from 'src/app/_models/main-tenant.model';
import {MainTenantServService} from 'src/app/_services/main-tenant-serv.service'
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import {Router} from '@angular/router';
import * as constMessage from 'src/app/_utils/constMessage';

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
    isMandatory = constMessage.isMandatory;
    isValidEmail = constMessage.isValidEmail
    isValidPhone = constMessage.isValidPhone
    isValidSocialNumber = constMessage.isValidSocialNumber
    isValidDate = constMessage.isValidDate;
    
    constructor(
        private mainTenantServ : MainTenantServService,
        private router : Router,
        
    ) {
         // Controls the form validation
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
    
    }

    ngOnInit(): void {
        this.isExist = false;
        
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
        this.mT.commonStatus = "ACTIF";
        
        console.log(this
            .mT);
        if (this.formStatusValue) {

            // search if mainTenant exists with the email else create

          /**   this
                .mainTenantServ
                .getMainTenantByEmail(this
                  .newMainTenantForm
                  .get("email")
                      ?.value)
                .subscribe((result:any|boolean) => {
                    this.isExist = result;
                    if (false === this.isExist) { */
                        this.mainTenantServ.saveMainTenant(this.mT).subscribe(result => {
                                alert(constMessage.dataSaved);
                                this.router.navigate(['/', 'tenant']);
                            }, error => {
                                console.error('There was an error!', error.status);
                                switch (error.status) {
                                    case 0:
                                        {
                                            alert(constMessage.saveApiError);
                                            break;
                                        }
                                    default:
                                        {
                                            alert(constMessage.saveImpossible);
                                            break;
                                        }
                                }
                            });
                    } else {
                            alert(constMessage.emailStillExist); 
                    }
                }/*, error => {
                  alert(
                    constMessage.saveImpossible
                );})               
        }else {
          alert(constMessage.saveInfoIncorrect);
      }
    }

    /* convenience getter for easy access
      to mainTenant form fields (left section)*/
      get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newMainTenantForm.controls;
    };

    /* check if the form is valid
    (left section)*/
    get formStatusValue() {
        if ('VALID' === this.newMainTenantForm.status) {
            this.formStatus = true;
        } else {
            this.formStatus = false;
        }
        return this.formStatus;
    }
}
