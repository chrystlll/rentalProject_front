import { DatePipe, formatDate } from '@angular/common';
import {Component, OnInit, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MainTenant} from 'src/app/_models/main-tenant.model';
import {MainTenantServService} from 'src/app/_services/main-tenant-serv.service';

@Component(
    {selector: 'app-tenant-details', providers:[DatePipe], templateUrl: './tenant-details.component.html', styleUrls: ['./tenant-details.component.css']}
)
export class TenantDetailsComponent implements OnInit {

    tenantIdFromRoute: any;
    mainTenant: MainTenant;
    newMainTenantForm !: FormGroup;
    lastName: any;
    firstName: any;
    email: any;
    editableStatus:boolean = false;
    formStatus: boolean = false;

    // Errors
    isMandatory = 'Ce champs est obligatoire';
    isValidEmail = 'L\' email saisi est invalide';
    isValidPhone = 'Le format doit être numérique (10 chiffres). ex: 0661844594';
    isValidSocialNumber = 'Le format n\'est pas correct.';
    isValidDate = 'La date saisie est invalide (DD/MM/AAAA => ex: 30/12/2021).';
    

    constructor(
        private route : ActivatedRoute,
        private maintenantService : MainTenantServService,
        private datePipe : DatePipe
    ) {
        const routeParams = this.route.snapshot.paramMap;
        this.tenantIdFromRoute = Number(routeParams.get('tenantId'));
        this.mainTenant = new MainTenant();
        this
            .maintenantService
            .getMainTenantById(this.tenantIdFromRoute)
            .subscribe((response) => {
                console.log(response);
                this.mainTenant = response;
                this.newMainTenantForm.controls['email'].setValue(this.mainTenant?.email);
                this.newMainTenantForm.controls['firstName'].setValue(this.mainTenant?.firstName);
                this.newMainTenantForm.controls['lastName'].setValue(this.mainTenant?.lastName);
                if(undefined != this.mainTenant.dob){
                    this.newMainTenantForm.controls['dob'].setValue(this.datePipe.transform(this.mainTenant.dob, 'yyyy-MM-dd'));
                }
                this.newMainTenantForm.controls['social'].setValue(this.mainTenant?.socialNumber);
                this.newMainTenantForm.controls['phoneNumber'].setValue(this.mainTenant?.phoneNumber);
                this.newMainTenantForm.controls['gender'].setValue(this.mainTenant?.gender);
                this.newMainTenantForm.controls['mainTenantStatus'].setValue(this.mainTenant.mainTenantStatus);
            });        
    }

    ngOnInit(): void {
        this.newMainTenantForm = new FormGroup({
            firstName: new FormControl('',[Validators.required]),
            dob: new FormControl,
            gender: new FormControl(),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phoneNumber: new FormControl(
                '',
                [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]
            ),
            social: new FormControl('', [Validators.pattern(
                    '^[1-478][0-9]{2}(0[1-9]|1[0-2]|62|63)(2[ABab]|[0-9]{2})(00[1-9]|0[1-9][0-9]|[1' +
                    '-8][0-9]{2}|9[0-8][0-9]|990)(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})(0[1-9]|[1-8][0' +
                    '-9]|9[0-7])$'
                )]),
            mainTenantStatus: new FormControl
        });        
    }

    /* Update MainTenant Data
    Note: if the validation controls are not OK => send error*/
    
    tenantFormSubmit() {

        if(this.formStatusValue){
        this.mainTenant.id = this.tenantIdFromRoute;

        if(this.newMainTenantForm.controls["phoneNumber"].value){
            this.mainTenant.phoneNumber = this.newMainTenantForm.controls['phoneNumber'].value;
        }else{
            this.mainTenant.phoneNumber = undefined;
        }

        if(this.newMainTenantForm.controls["social"].value){
            this.mainTenant.socialNumber = this.newMainTenantForm.controls['social'].value;
        }else{
            this.mainTenant.socialNumber = undefined;
        }
        
        if(this.newMainTenantForm.controls["firstName"].value){
            this.mainTenant.firstName = this.newMainTenantForm.controls['firstName'].value;
        }else{
            this.mainTenant.firstName = undefined;
        }

        if(this.newMainTenantForm.controls["dob"].value){
            this.mainTenant.dob = this.newMainTenantForm.controls['dob'].value;
        }else{
            this.mainTenant.dob = undefined;
        }

        if(this.newMainTenantForm.controls["mainTenantStatus"].value){
            this.mainTenant.mainTenantStatus = this.newMainTenantForm.controls['mainTenantStatus'].value;
        }else{
            this.mainTenant.mainTenantStatus = undefined;
        }

        if(this.newMainTenantForm.controls["lastName"].value){
            this.mainTenant.lastName = this.newMainTenantForm.controls['lastName'].value;
        }else{
            this.mainTenant.lastName = undefined;
        }
        
        if(this.newMainTenantForm.controls["email"].value){
            this.mainTenant.email = this.newMainTenantForm.controls['email'].value;
        }else{
            this.mainTenant.email = undefined;
        }

        this.maintenantService.updateMainTenant(this.mainTenant).subscribe((response)=>{
            alert("Données sauvegardées");
            this.editableStatus = false;
        },(error)=>{
            alert("Sauvegarde Impossible!! Veuillez réessayer ultérieurement");
        });
    }else{
        alert("Erreur de saisie. Veuillez vérifier les informations.");
    }
    }


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
}
