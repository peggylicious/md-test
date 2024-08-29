import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';
import { PostComponent } from '../post/post.component';
import { EmptyPostListComponent } from '../../shared/components/empty-post-list/empty-post-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, EmptyPostListComponent, PostComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  IS_SHOW_FORM: boolean = false;
  router = inject(Router)
  route = inject(ActivatedRoute)
  postService = inject(PostService)
  showForm(){
    return this.IS_SHOW_FORM = !this.IS_SHOW_FORM;
  }
  addPost(){
    this.router.navigate(['../add-post'], { relativeTo: this.route });
  }
  editPost(post: Post){
    this.router.navigate([`../edit-post/${post.id}`], { relativeTo: this.route });
  }
  deletePost(post: Post){
    this.postService.onDeletePost(post)
  }
}
