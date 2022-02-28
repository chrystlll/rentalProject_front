import {Component, OnInit} from '@angular/core';
import {MainTenant} from 'src/app/_models/main-tenant.model';
import {MainTenantServService} from 'src/app/_services/main-tenant-serv.service'
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import {Router} from '@angular/router';

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
    isMandatory = 'Ce champs est obligatoire';
    isValidEmail = 'L\' email saisi est invalide';
    isValidPhone = 'Le format doit être numérique (10 chiffres). ex: 0661844594';
    isValidSocialNumber = 'Le format n\'est pas correct.';
    isValidDate = 'La date saisie est invalide (DD/MM/AAAA => ex: 30/12/2021).';
    
    
    constructor(
        private mainTenantServ : MainTenantServService,
        private router : Router
    ) {}

    ngOnInit(): void {
        this.isExist = false;
        this.newMainTenantForm = new FormGroup({
            firstName: new FormControl('',[Validators.required]),
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


    /* convenience getter for easy access to form fields */
    get form(): {
        [key: string]: AbstractControl;
    } {
        return this.newMainTenantForm.controls;
    };

    get formStatusValue() {
        if ('VALID' === this.newMainTenantForm.status) {
            this.formStatus = true;
        } else {
            this.formStatus = false;
        }
        return this.formStatus;
    }

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
                                alert("Données sauvegardées");
                                this.router.navigate(['/', 'tenant']);
                            }, error => {
                                console.error('There was an error!', error.status);
                                switch (error.status) {
                                    case 0:
                                        {
                                            alert(
                                                "Sauvegarde Impossible!! Echec connexion API. Veuillez réessayer ultérieurement"
                                            );
                                            break;
                                        }
                                    default:
                                        {
                                            alert("Sauvegarde Impossible!! Veuillez réessayer ultérieurement");
                                            break;
                                        }
                                }
                            });
                    } else {
                            alert("L'email existe déjà");
                        
                    }
                }, error => {
                  alert(
                    "Sauvegarde Impossible!! Veuillez réessayer ultérieurement"
                );})   


            
        }else {
          alert("Erreur de saisie. Veuillez vérifier les informations.");
      }
    }

}
