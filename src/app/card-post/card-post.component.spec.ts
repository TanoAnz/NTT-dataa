import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CardPostComponent } from './card-post.component';
import { DataService } from '../services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

const mockPost = {
  id: 123,
  title: 'Test Post',
  body: 'This is a test post.',
  user_id: 1234
};

describe('CardPostComponent', () => {
  let component: CardPostComponent;
  let fixture: ComponentFixture<CardPostComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getProtectedData']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CardPostComponent],
      providers: [{ provide: DataService, useValue: dataServiceSpy }]
    }).compileComponents();

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPostComponent);
    component = fixture.componentInstance;

    component.post = mockPost;

    dataService.getProtectedData.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create the component', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick();
  }));
  it('ApriForm has been called', () => {
    spyOn(component, 'apriForm');
    component.apriForm();
    expect(component.apriForm).toHaveBeenCalled();
  })
  it('toggleComments has been called', ()=>{
    spyOn(component, 'toggleComments'),
    component.toggleComments();
    expect(component.toggleComments).toHaveBeenCalled();
  })

});
