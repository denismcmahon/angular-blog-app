import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss']
})
export class BlogPostPreviewComponent {
  @Input() post: any;

  constructor(private router: Router) {}

  viewPost() {
    this.router.navigate(['/post', this.post._id]);
  }
}
