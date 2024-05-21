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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.postForm.valid) {
      const post = this.postForm.value;
      this.http.post('http://localhost:3000/api/posts', post).subscribe(response => {
        console.log('Post saved', response);
      });
    }
  }
}
