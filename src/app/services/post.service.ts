import { computed, DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
  private deletedPost = new Subject<number>();

  // Actions
  private newPost$ = this.newPost.asObservable();
  private updatePost$ = this.updatePost.asObservable();
  private deletedPost$ = this.deletedPost.asObservable();

  constructor() { 
    // Get all Posts
    this.getAllPostsRemote().pipe(takeUntilDestroyed()).subscribe(posts => this.setPost(posts))
    // Add new Post
    this.newPost$.pipe(
      // tap(()=> this.updateLoadingIndicatorStatus(true)),
      switchMap((post) => this.addPostRemote(post)),
      takeUntilDestroyed(),
    ).subscribe(post => {
      this.setPost([post])
    })
    
    // Add update Post

    this.updatePost$.pipe(switchMap(post => this.updatePostRemote(post)), 
      takeUntilDestroyed()
    ).subscribe(res=>this.updatePostLocal(res))
    this.deletedPost$.pipe(switchMap(id => this.deletePostRemote(id)), takeUntilDestroyed()).subscribe(res=>this.deletePost(res))
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

  // API Requests
  private getAllPostsRemote():Observable<Post[]>{
    console.log('GET ALL POSTS REMOTE, ', this.allPosts())
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(catchError(err => this.setError(err, this.postState))) as Observable<Post[]>;
  }

  private addPostRemote(post: Post): Observable<Post>{
    console.log("Adding post to api backend, ", post)
    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(catchError(err => this.setError(err, this.postState))) as Observable<Post>;
  }

  updatePostRemote(post: Post):  Observable<Post>{
    console.log('On update post remote, ', post);
    return this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post).pipe(catchError(err => this.setError(err, this.postState))) as Observable<Post>;
  }

  private deletePostRemote(id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`).pipe(catchError(err => this.setError(err, this.postState))) as Observable<any>;
  }

  // Local Updates
  private deletePost(id:number){
    this.postState.update(state => ({
      ...state,
      allPosts: state.allPosts.filter(post => post.id !== id)
    }))
    console.log(this.postState())
  }
  

  // Action calls
  onAddNewPost(post: Post){
    this.newPost.next(post);
  }
  onUpdatePost(post: Post){
    this.updatePost.next(post)
  }
  onDeletePost(post:Post){
    return this.http.delete<Post>(`${this.baseUrl}/posts/${post.id}`, post).pipe(catchError(err => this.setError(err, this.postState))) as Observable<Post>;
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
export interface Post{
  id: number,
  userId: string,
  title: string,
  body: number
}

export interface PostsState{
  isLoading: boolean,
  allPosts: Post[],
  error: string | null
}
