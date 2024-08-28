import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
  fb = inject(FormBuilder)

  postForm: FormGroup  = this.fb.group({
    id: [''],
    userId: [''],
    title: [''],
    body: ['']
  })

  initializeForm(){
    return this.postForm = this.fb.group({
      id: [''],
      userId: [''],
      title: [''],
      body: ['']
    })
  }
  submit(){
    console.log(this.postForm.value)
  }
}
