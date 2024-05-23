import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.postForm.valid) {
      const { title, content } = this.postForm.value;
      this.postService.addPost(title, content).subscribe(
        response => {
          console.log('Navigating to home');
          this.router.navigate(['/']); // redirect to home or another appropriate page
        },
        error => {
          this.errorMessage = 'An error occurred while creating the post. Please try again.';
        }
      );
    }
  }
}
