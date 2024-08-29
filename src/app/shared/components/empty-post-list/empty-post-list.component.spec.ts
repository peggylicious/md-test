import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPostListComponent } from './empty-post-list.component';

describe('EmptyPostListComponent', () => {
  let component: EmptyPostListComponent;
  let fixture: ComponentFixture<EmptyPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyPostListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
