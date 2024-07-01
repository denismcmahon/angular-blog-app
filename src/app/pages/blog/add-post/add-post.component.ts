import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { QuillEditorComponent } from 'ngx-quill';
import ImageUpload from '../../../shared/quill-image-upload.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  @ViewChild(QuillEditorComponent) quillEditorComponent: QuillEditorComponent;
  postForm: FormGroup;
  errorMessage: string | null = null;
  quillInstance: any;

  tagInput: string = '';
  tags: string[] = [];
  suggestions: string[] = [];

  quillModules = {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'image']
    ],
    imageUpload: {
      url: '/api/upload/upload-image',
      method: 'POST',
      name: 'image',
      handler: (image: any, callback: any) => {
        const formData = new FormData();
        formData.append('image', image);

        fetch('/api/upload/upload-image', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            callback(result.imageUrl);
          })
          .catch((error) => {
            console.error('Image upload error:', error);
            callback('');
          });
      }
    },
    imageResize: {}
  };

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onEditorCreated(event: QuillEditorComponent) {
    this.quillInstance = event;
    new ImageUpload(this.quillInstance, this.quillModules.imageUpload);
  }

  onTagInputChange(): void {
    const query = this.tagInput.trim();
    if (query) {
      this.http.get<string[]>(`/api/tags?search=${query}`).subscribe((data) => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = [];
    }
  }

  addTag(tag: string): void {
    console.log('DM ==> addTag', tag);
    tag = tag.trim();
    if (tag && this.tags.indexOf(tag) === -1) {
      this.tags.push(tag);
    }
    this.tagInput = '';
    this.suggestions = [];
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    if (this.quillInstance) {
      const content = this.quillInstance.root.innerHTML;
      this.postForm.get('content')?.setValue(content);

      const title = this.postForm.get('title')?.value;

      this.postService.addPost(title, content, this.tags).subscribe({
        next: (response) => {
          this.toastr.success('Post added', 'Success');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while creating the post. Please try again.';
          console.error('Error creating post:', error);
        }
      });
    } else {
      console.error('Quill editor is not ready');
    }
  }
}
