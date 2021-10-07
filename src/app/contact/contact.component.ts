import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  @ViewChild('fform') feedbackFormDirective: any;
  
  feedbackForm! : FormGroup;
  feedback! : Feedback;
  
  constructor(private fb : FormBuilder) { 
    this.createForm();
  }
  
  ngOnInit(): void {
  }
  
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      telnum : ['', Validators.required],
      email : ['', Validators.required],
      agree : false,
      contactType : 'None',
      message : ''
    });
  }
  
  onSubmit() {
    if (this.feedbackForm.valid) {
      this.feedback = this.feedbackForm.value;
      console.log(this.feedback);
      this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      });
      this.feedbackFormDirective.resetForm();
    }
  }
}
