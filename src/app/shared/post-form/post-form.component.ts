import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
  fb = inject(FormBuilder)
  postService = inject(PostService)
  formTitle: string = 'Add Form';

  postForm: FormGroup  = this.fb.group({
    id: [1],
    userId: [],
    title: [''],
    body: ['']
  })

  initializeForm(){
    return this.postForm = this.fb.group({
      id: [3],
      userId: [],
      title: [''],
      body: ['']
    })
  }
  submit(){
    console.log(this.postForm.value)
    this.postService.onUpdatePost(this.postForm.value)
  }
}
