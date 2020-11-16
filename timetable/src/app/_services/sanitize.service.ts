import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanitizeService {

constructor() { }

  sanitizeSpaces (str){
    if (!str.replace(/\s/g, '').length) {
        return true;
    }else return false;
  }
  sanitizeInputChar (str){    
    var formateCheck = /^[A-Za-z0-9 ]+$/;
    if(formateCheck.test(str) == false) {
        return true;
    }else return false;
  }
}
