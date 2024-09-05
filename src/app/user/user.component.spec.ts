import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserComponent } from './user.component';
import { DataService } from '../services/data.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User.model';
import { post } from '../models/post.model';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-card-social',
  template: '<div></div>'
})
class MockCardSocialComponent {
  @Input() user: any;
}

class MockDataService {
  getProtectedData() {
    return of([]);
  }
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpMock: HttpTestingController;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserComponent, MockCardSocialComponent],
      providers: [
        { provide: DataService, useClass: MockDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123' 
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
