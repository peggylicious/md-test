import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-post-list',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './empty-post-list.component.html',
  styleUrl: './empty-post-list.component.css'
})
export class EmptyPostListComponent {

}
