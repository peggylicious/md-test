import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'post',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  postService = inject(PostService);
  post = input.required<Post>();
  @Output() onEditPost = new EventEmitter()
  @Output() onDeletePost = new EventEmitter()
  editPost(post: Post){
    this.onEditPost.emit(post)
  }
  deletePost(post: Post){
    console.log('delete')
    this.onDeletePost.emit(post)
  }
}
