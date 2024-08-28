import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private paletteToggleState = signal(false);
  paletteToggle = computed(()=> this.paletteToggleState());
  
  constructor() { 
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);
   }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark:boolean) {
    console.log('isDark - ', isDark)
    if((isDark && (localStorage.getItem('mdTestTheme') === 'dark')) || (!isDark && (localStorage.getItem('mdTestTheme') === 'dark'))){
      this.paletteToggleState.set(true);
      this.toggleDarkPalette(true);
    }else{
      console.log(isDark)
      this.paletteToggleState.set(isDark);
      this.toggleDarkPalette(isDark);
    }
    
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev:any) {
    if(ev){
      localStorage.setItem('mdTestTheme', 'dark');
    }else{
      localStorage.setItem('mdTestTheme', 'light');
    }
    this.toggleDarkPalette(ev);
  }

  // Add or remove the "md-test-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    this.paletteToggleState.set(shouldAdd);
    console.log(this.paletteToggleState())
    document.documentElement.classList.toggle('md-test-palette-dark', shouldAdd);
  }
}
