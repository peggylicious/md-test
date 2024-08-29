export interface Post{
    id: string,
    userId: number,
    title: string,
    body: string
  }
  
export interface PostsState{
    isLoading: boolean,
    allPosts: Post[],
    error: string | null
}