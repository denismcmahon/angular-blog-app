// add-post.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('content', this.postForm.get('content')?.value);

    this.selectedFiles.forEach((file, index) => {
      formData.append(`images`, file, file.name);
    });

    this.http.post('/api/posts/add', formData).subscribe(
      response => {
        console.log('Post created successfully', response);
      },
      error => {
        console.error('Error creating post', error);
      }
    );
  }
}
