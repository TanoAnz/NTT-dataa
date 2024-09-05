import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElencoPostComponent } from './elenco-post.component';
import { DataService } from '../services/data.service';
import { of, throwError } from 'rxjs';
import { post } from '../models/post.model';
import { LogoutComponent } from '../logout/logout.component';
import { MenuComponent } from '../menu/menu.component';
import { AddremovepostComponent } from './addremovepost/addremovepost.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ElencoPostComponent', () => {
  let component: ElencoPostComponent;
  let fixture: ComponentFixture<ElencoPostComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getProtectedData']);

    await TestBed.configureTestingModule({
      declarations: [ElencoPostComponent, LogoutComponent, MenuComponent, AddremovepostComponent],
      imports:[HttpClientTestingModule],
      providers: [{ provide: DataService, useValue: dataServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoPostComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on ngOnInit', () => {
    const mockPosts: post[] = [
      { title: 'Post 1', body: 'Content 1', user_id: 1, id:1 },
      { title: 'Post 2', body: 'Content 2', user_id: 1, id:1 }
    ];
    dataService.getProtectedData.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(component.posts).toEqual(mockPosts);
    expect(dataService.getProtectedData).toHaveBeenCalledWith('/posts?page=1&per_page=10');
  });


  it('should increase recordPerPage and fetch posts on fetchPost', () => {
    spyOn(component, 'ngOnInit');

    component.fetchPost();

    expect(component.recordPerPage).toBe(20);
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
