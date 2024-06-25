import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { QuillEditorComponent } from 'ngx-quill';
import ImageUpload from '../../../shared/quill-image-upload.module'; // Adjust the path based on your project structuree

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  @ViewChild(QuillEditorComponent) quillEditorComponent: QuillEditorComponent;
  postForm: FormGroup;
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

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onEditorCreated(event: QuillEditorComponent) {
    this.quillInstance = event;
    console.log('Quill instance is ready:', this.quillInstance);
    new ImageUpload(this.quillInstance, this.quillModules.imageUpload);
  }

  onSubmit(): void {
    console.log('Form submitted:', this.postForm.value);
    if (this.postForm.invalid) {
      return;
    }

    // Check if the Quill instance is ready
    if (this.quillInstance) {
      console.log('Quill editor content:', this.quillInstance);
      const content = this.quillInstance.root.innerHTML;
      this.postForm.get('content')?.setValue(content);

      const title = this.postForm.get('title')?.value;

      this.postService.addPost(title, content).subscribe(
        response => console.log('Post created successfully', response),
        error => console.error('Error creating post', error)
      );
    } else {
      console.error('Quill editor is not ready');
    }
  }
}
