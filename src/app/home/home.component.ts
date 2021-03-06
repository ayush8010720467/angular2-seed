import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.services';
import { NgForm } from '@angular/forms';
import  { BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = [];
  model = new Employee('','',false,'',"default");
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster){
    this.formPoster.getLanguages()
        .subscribe(
          data => this.languages = data.languages,
          err => console.log('get error: ',err)
        );

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
    .subscribe(
      data => console.log('sucess: ',data),
      err => console.log('error: ',err)
    )
  }
}
