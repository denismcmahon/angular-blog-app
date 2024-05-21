import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  title: string = '';
  content: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    const post = { title: this.title, content: this.content }
    this.http.post('http://localhost:3000/api/posts', post).subscribe(response => {
      console.log('Post saved', response);
    })
  }
}
