import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function passwordValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const passwordValidationDirective = new PasswordDirective();
    return passwordValidationDirective.validate(control);
  }
}

@Directive({
  selector: '[appPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true }]
})

export class PasswordDirective implements Validator {

  constructor() { }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const password = <string>control.value;
    if (password.length < 6) { 
      return { 'passwordValidation': { 'message': 'El password debe contener al menos 6 carácteres' } } 
    }
    if (password === password.toLocaleLowerCase()) {
      return { 'passwordValidation': { 'message': 'El password debe contener mayúsculas' } }
    }
    if(!/\d/.test(password)){
      return { 'passwordValidation': { 'message': 'El password debe contener un carácter numérico' } }
    }
    return null;
  }

}