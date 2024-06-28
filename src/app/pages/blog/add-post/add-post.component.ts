import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { QuillEditorComponent } from 'ngx-quill';
import ImageUpload from '../../../shared/quill-image-upload.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Quill from 'quill';

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

  quillModules = {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'image']
    ],
    imageUpload: {
      url: '/api/upload/upload-image', // Endpoint to upload image
      method: 'POST',
      name: 'image', // Name of the field that your backend expects
      handler: (image: any, callback: any) => {
        const formData = new FormData();
        formData.append('image', image);

        fetch('/api/upload/upload-image', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            callback(result.imageUrl); // Pass the image URL to Quill editor
          })
          .catch((error) => {
            console.error('Image upload error:', error);
            callback('');
          });
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
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

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    // check if the Quill instance is ready
    if (this.quillInstance) {
      const content = this.quillInstance.root.innerHTML;
      this.postForm.get('content')?.setValue(content);

      const title = this.postForm.get('title')?.value;

      this.postService.addPost(title, content).subscribe({
        next: (response) => {
          console.log('Post created successfully', response);
          this.toastr.success('Post added', 'Success');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while creating the user. Please try again.';
          console.error('Error creating user:', error);
        }
      });
    } else {
      console.error('Quill editor is not ready');
    }
  }
}
