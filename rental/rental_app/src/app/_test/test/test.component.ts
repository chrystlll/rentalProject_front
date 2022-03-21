import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { CSVCodePostalRecord } from 'src/app/_models/csv-code-postal.model';
import { ReadCSVServService } from 'src/app/_services/read-csvserv.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


    // General properties
  newAdressForm !: FormGroup;



    
  public records: CSVCodePostalRecord[] = [];  
  private _csvURL = 'assets/document/laposte_hexasmal.csv';
  currentItem:any;


  
  constructor(private readCSVserv: ReadCSVServService) { 
      
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any, searchString:string) {  
    let csvArr = [];  
    for (let i = 1; i < csvRecordsArray.length; i++) {  

      let curruntRecord = (csvRecordsArray[i]).split(';');  
        let csvRecord: CSVCodePostalRecord = new CSVCodePostalRecord();  
        csvRecord.Nom_commune = curruntRecord[1].trim();  
        csvRecord.Code_postal = curruntRecord[2].trim();
        // CBN TO DO 
        // NOT INSERT IF Nom_Commune exist in arrayList
        csvArr.push(csvRecord);  
    }
        if (!searchString && !searchString.trim()){
        return of(csvArr);
        }
        else {
          let wholeCity = [...csvArr];
          let filterdProducts = wholeCity.filter(x => x.Code_postal.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
          console.log("res: " + filterdProducts)
          return of(filterdProducts);
        }
    
  }  
  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  

  adressFormSubmit(){

  }


  ngOnInit(): void {
    this.newAdressForm = new FormGroup({
      zipCode : new FormControl('',[Validators.maxLength(5) || Validators.minLength(5)]),
      city: new FormControl()
    })
  }     

  search(event:any) {
    if(event.value.length===5){
    this.readCSVserv.getInfo(this._csvURL).subscribe((response)=>{
      let csvData = response;  
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
      let headersRow = this.getHeaderArray(csvRecordsArray);  

      //filter
     this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length,event.value).subscribe((response)=>{
       this.records = response;
     }); 

    });
  }
  }
  
}
