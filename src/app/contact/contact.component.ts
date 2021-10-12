import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animations';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  
  @ViewChild('fform') feedbackFormDirective: any;
  
  feedbackForm! : FormGroup;
  feedback! : Feedback;
  receivedFeedback! : Feedback;
  spinnerVisibility! : boolean;

  formErrors : any = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages : any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  
  constructor(private fb : FormBuilder,
    private feedbackService : FeedbackService) { 
    this.spinnerVisibility = false;
    this.createForm();
  }
  
  ngOnInit(): void {
  }
  
  createForm() {
    let id = Math.floor(1000 + Math.random() * 9000).toString();
    this.feedbackForm = this.fb.group({
      id : id,
      firstname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum : ['', [Validators.required, Validators.pattern]],
      email : ['', [Validators.required, Validators.email]],
      agree : true,
      contactType : 'Tel',
      message : ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  
  async onSubmit() {
    if (this.feedbackForm.valid) {
      console.log(this.receivedFeedback);
      this.spinnerVisibility = true;
      this.feedback = this.feedbackForm.value;
      await this.feedbackService.postFeedback(this.feedback);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await this.feedbackService.getFeedback(this.feedback.id).then(feedback => this.receivedFeedback = feedback);
      this.spinnerVisibility = false;
    }
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
