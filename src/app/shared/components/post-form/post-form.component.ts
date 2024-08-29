import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass, NgIf],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent{
  fb = inject(FormBuilder)
  postService = inject(PostService)
  formTitle: string = 'Add Form';
  title = input.required<string>();
  postId:string|null = null;
  router = inject(Router)
  route = inject(ActivatedRoute)
  

  postForm: FormGroup  = this.fb.group({
    id: ['', Validators.required],
    userId: [null, Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required]
  })

  // initializeForm(){
  //   return this.postForm = this.fb.group({
  //     id: [''],
  //     userId: [],
  //     title: [''],
  //     body: ['']
  //   })
  // }

  ngOnInit(){
    console.log(this.title())
    if(this.title() === 'edit'){
      this.postId = this.route.snapshot.paramMap.get('id');
      if(this.postId){
        let selectedPost = this.postService.allPosts().filter(post=>post.id === this.postId)
        console.log(selectedPost)
        this.postForm.patchValue(selectedPost[0])
      }
    }
    if(this.title() === 'add'){
      console.log('add')
      this.postForm.patchValue({id: (this.postService.allPosts().length + 1).toString()})
    }
  }
  submit(){
    if(this.title() === 'edit'){
      this.postId = this.route.snapshot.paramMap.get('id');
      this.postService.onUpdatePost(this.postForm.value)
      this.router.navigate([`/home`]);
      
    }
    if(this.title() === 'add'){
      // this.postForm.patchValue({id: (this.postService.allPosts().length + 1).toString()})
      this.postService.onAddNewPost(this.postForm.value)
      this.router.navigate([`/home`]);
    }
    console.log(this.postForm.value)
  }
}
