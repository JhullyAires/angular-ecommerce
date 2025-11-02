import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidator {

  // whitespace validator
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    // check if string only contains whitespace
    if ((control.value != null) && (control.value.trim().length === 0)) {
      // invalid, return error object
      return { 'notOnlyWhitespace': true };
    } else {
      // valid, return null
      return null;
    }
    // if validation check fails, then return validation error(s)
    // if validation check passes, then return null
  }
}
