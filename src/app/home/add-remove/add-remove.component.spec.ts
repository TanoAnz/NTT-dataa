import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddremoveComponent } from './add-remove.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('AddRemoveComponent', () => {
  let component: AddremoveComponent;
  let fixture: ComponentFixture<AddremoveComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['addUser', 'removeUser']);

    await TestBed.configureTestingModule({
      declarations: [AddremoveComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddremoveComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
