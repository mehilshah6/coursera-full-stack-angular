import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') commentFormDirective: any;
  
  dish! : Dish;
  dishIds! : string[];
  prev! : string;
  next! : string;
  commentForm! : FormGroup;
  comment! : Comment;
  
  formErrors : any = {
    'author': '',
    'comment': '',
  };
  
  validationMessages : any = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment is required.',
    }
  };
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb : FormBuilder) {
      this.createForm();
    }
    
    ngOnInit() {
      const id = this.route.snapshot.params['id'];
      this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }
    
    goBack(): void {
      this.location.back();
    }
    
    setPrevNext(dishId : string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    
    createForm() {
      this.commentForm = this.fb.group({
        author : ['', [Validators.required, Validators.minLength(2)]],
        rating : 5,
        comment : ['', [Validators.required]]
      });
      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }
    
    onSubmit() {
      if (this.commentForm.valid) {
        this.comment = this.commentForm.value;
        this.comment.date = new Date().toISOString(); 
        this.dish.comments.push(this.comment);
        this.commentForm.reset({
          author : '',
          rating : 5,
          comment : ''
        });
        for (let control in this.commentForm.controls) {
          this.commentForm.controls[control].setErrors(null);
        }
      }
    }
    
    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
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
