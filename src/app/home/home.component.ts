import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = ['English','Spanish','Hindi','Others'];
  model = new Employee('','',false,'',"default");
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster){

  }
  firstNameToUpperCase(value: string){
    if(value.length >0){
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    }
    else{
      this.model.firstName = value;
    }

  }
  validatePrimaryLanguage(value){
    if( value == 'default'){
        this.hasPrimaryLanguageError = true;
    }
    else{
      this.hasPrimaryLanguageError = false;

    }
  }
  submitForm(form: NgForm){
    //validate the form
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if(this.hasPrimaryLanguageError){
      return;
    }
    this.formPoster.postEmployeeForm(this.model)
  }
}
