import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent implements OnInit {
  postId: string | null = null;
  errorMessage: string | null = null;
  post: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    console.log('Post ID:', this.postId);

    this.postService.getPostById(this.postId!).subscribe(post => {
      console.log('Post data:', post);
      this.post = post;
    }, error => {
      this.errorMessage = 'An error occurred while fetching the user data. Please try again.';
      console.error('Error fetching user data:', error);
    });
  }
}
