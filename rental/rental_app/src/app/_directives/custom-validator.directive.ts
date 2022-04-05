import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/** A start date can't be > to a end date */

export function forbiddenDateValidator(): ValidatorFn {
    return (control : AbstractControl): ValidationErrors | null => {
        const endDate = control.get('endDate');
        const startDate = control.get('startDate');

        let forbidden = true;

        if (endDate.value) {
            forbidden = startDate.value > endDate.value;
        } else {
            forbidden = false;
        }

        return forbidden
            ? {
                forbiddenDate: {
                    value: control.value
                }
            }
            : null;
    };
}