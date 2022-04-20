import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as validators from 'src/app/_directives/custom-validator.directive';
import { Contract } from 'src/app/_models/contract.model';
import { EnumType } from 'src/app/_models/enumType.model';
import { Price } from 'src/app/_models/price.model';
import { EnumTypeServService } from 'src/app/_services/enum-serv.service';
import { PriceServService } from 'src/app/_services/price-serv.service';
import * as constMessage from 'src/app/_utils/constMessage';


@Component({
  selector: 'app-dialog-price',
  templateUrl: './dialog-price.component.html',
  styleUrls: ['./dialog-price.component.css']
})
export class DialogPriceComponent implements OnInit {
  @Input() contract: Contract;
  @Output() onPriceValidated: EventEmitter<String>;

  constructor(public dialog: MatDialog){ 
    this.onPriceValidated =new EventEmitter;
  }

  
  ngOnInit(): void {

  }
  // button click function to open dailog with form
  openDialog() {
    const dialogRef = this.dialog.open(DialogPriceDialog,
      {
        width: '450px',
        data: this.contract,
      }
      );
      dialogRef.afterClosed().subscribe(result => {
        this.onPriceValidated.emit("test");
      });
          
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //condition true
    const isSubmitted = form && form.submitted;
    //false
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
//Dialog Component
@Component({
  selector: 'dialog-price-dialog',
  templateUrl: './dialog-price-dialog.html',
  styleUrls: ['./dialog-price-dialog.css']
})
export class DialogPriceDialog {

  priceForm:FormGroup;
  durationTypes:EnumType[];
  price:Price;

  constructor(@Inject(MAT_DIALOG_DATA) private contract: Contract, public dialogRef: MatDialogRef<DialogPriceDialog>,private enumServ: EnumTypeServService, private priceServ:PriceServService) {
    this.initPriceForm();
    this.initEnumList();
  }
  
  //Dialog close function 
  onNoClick(): void {
    
    this.dialogRef.close({event:"ADD"});
  }

  //init the enum lists
  initEnumList(){
    this.enumServ.getDurationTypes().subscribe((response)=>{
      this.durationTypes =response;
    })
  }

  //init the price form
  initPriceForm(){
    this.priceForm = new FormGroup({
      id: new FormControl,
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl,
      currency: new FormControl('€', Validators.required),
      amount: new FormControl('', Validators.required),
      durationType: new FormControl('MOIS', Validators.required)
  }, {validators: validators.forbiddenDateValidator()});
  }

  /*Form validations*/
    matcher = new MyErrorStateMatcher();

    priceFormSubmit(){
      this.price = new Price;
      this.price.startDate=this.priceForm.controls['startDate'].value;
      this.price.endDate=this.priceForm.controls['endDate'].value;
      this.price.currency=this.priceForm.controls['currency'].value;
      this.price.amount=this.priceForm.controls['amount'].value;
      this.price.durationType=this.priceForm.controls['durationType'].value;
      this.priceServ.savePrice(this.price,this.contract.id).subscribe((response)=>{
        alert(constMessage.dataSaved);
        this.onNoClick();
      });
    }
}
