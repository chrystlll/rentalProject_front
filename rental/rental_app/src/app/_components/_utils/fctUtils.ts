import { AbstractControl, FormGroup } from "@angular/forms";

export default class Utils {
    static form(newForm:FormGroup): {
        [key: string]: AbstractControl;
    } {
        return newForm.controls;
    }

    static formStatusValue(newForm:FormGroup,status:boolean) {
        
        if ('VALID' === newForm.status) {
            status = true;
        } else {
            status = false;
        }
        return status;
    }
    
}