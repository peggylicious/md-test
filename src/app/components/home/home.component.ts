import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PostFormComponent } from '../../shared/post-form/post-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, PostFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  IS_SHOW_FORM: boolean = false;
  showForm(){
    return this.IS_SHOW_FORM = !this.IS_SHOW_FORM;
  }
}
