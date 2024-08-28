import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'md-test-header',
  standalone: true,
  imports: [ NgOptimizedImage ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  themeService = inject(ThemeService)
  paletteToggle = this.themeService.paletteToggle;
  toggleTheme(state: boolean){
    this.themeService.toggleChange(state)
  }
}
