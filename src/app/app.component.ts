import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private themeService: ThemeService, private postService: PostService){}
  title = 'md-test';
}
