import { computed, DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Post, PostsState } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = environment.restUrl;
  destroyRef = inject(DestroyRef);

  // State
  private postState = signal<PostsState>({
    isLoading: false,
    allPosts: [],
    error: null
  })

  // Selectors
  allPosts = computed(() => this.postState().allPosts)

  // Sources
  private newPost = new Subject<Post>();
  private updatePost = new Subject<any>();
  private deletedPost = new Subject<Post>();

  // Actions
  private newPost$ = this.newPost.asObservable();
  private updatePost$ = this.updatePost.asObservable();
  private deletedPost$ = this.deletedPost.asObservable();

  constructor() { 
    // Get all Posts
    this.getAllPostsRemote().pipe(takeUntilDestroyed()).subscribe(posts => this.setPost(posts))
    // Add new Post
    this.newPost$.pipe(
      switchMap((post) => this.addPostRemote(post)),
      takeUntilDestroyed(),
    ).subscribe(post => {
      this.setPost([post])
    })
    
    // Update Post

    this.updatePost$.pipe(switchMap(post => this.updatePostRemote(post)), 
      takeUntilDestroyed()
    ).subscribe(res=>this.updatePostLocal(res))

    // Delete Post

    this.deletedPost$.pipe(switchMap(post => this.deletePostRemote(post.id)), takeUntilDestroyed()).subscribe(res=>this.deletePost(res))
    
    

  }


  // Local Updates
  private deletePost(val:Post){
    console.log(val)
    this.postState.update(state => ({
      ...state,
      allPosts: state.allPosts.filter(post => post.id !== val.id)
    }))
    console.log(this.postState())
  }

  private setPost(posts: Post[]){
    console.log("Adding post to State, ", posts)
    this.postState.update(state => ({
      ...state,
      allPosts: [...state.allPosts, ...posts],
      isLoading: false
    }))
    console.log(this.postState())
  }
  private updatePostLocal(post:Post){
    this.postState.update(state => ({
      ...state,
      allPosts: [...state.allPosts.map(item=>item.id === post.id ? post : item)],
      isLoading: false
    }))
  }

  // Remote API Requests
  private getAllPostsRemote():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(catchError(err => this.setError(err, this.postState))) as Observable<Post[]>;
  }

  private addPostRemote(post: Post): Observable<Post>{
    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(catchError(err => this.setError(err, this.postState))) as Observable<Post>;
  }

  updatePostRemote(post: Post):  Observable<Post>{
    return this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post).pipe(catchError(err => this.setError(err, this.postState))) as Observable<Post>;
  }

  private deletePostRemote(id:string): Observable<any>{
    console.log(id)
    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`).pipe(catchError(err => this.setError(err, this.postState))) as Observable<any>;
  }


  

  // Action callers
  onAddNewPost(post: Post){
    this.newPost.next(post);
  }
  onUpdatePost(post: Post){
    this.updatePost.next(post)
  }
  onDeletePost(post:Post){
    this.deletedPost.next(post)
  }


  private setError(err: HttpErrorResponse, sig: WritableSignal<PostsState>): Observable<Post[]>{
    console.log("Setting error state")
    sig.update(state => ({...state,
      error: setErrorMessage(err)
    }));
    console.log(sig())
    return of([])
  }
  
}

export function setErrorMessage(Err: HttpErrorResponse): string{
  console.log('Is errorying')
  return 'Failed to get response'
}
