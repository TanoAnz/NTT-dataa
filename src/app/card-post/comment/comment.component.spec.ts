import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommentComponent } from './comment.component';

const mockComment = {
  id: 1,
  post_id: 123,
  name: 'Test User',
  email: 'test@example.com',
  body: 'This is a test comment.'
};

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = mockComment;
    fixture.detectChanges();
  });

  it('should create the component', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick();
  }));
});