import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get<any[]>('http://localhost:3000/api/posts').subscribe(data => {
        this.posts = data;
      });
  }
}
