import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(title: string, content: string, tags: string[]): Observable<any> {
    return this.http.post<any>('/api/posts/add-post', { title, content, tags });
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>('api/posts/getposts');
  }

  getTags(query:any): Observable<any[]> {
    return this.http.get<any[]>('api/posts/tags');
  }

  getPostById(postId: string): Observable<any> {
    return this.http.get<any>(`/api/posts/getpost/${postId}`);
  }
}
