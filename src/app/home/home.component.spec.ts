import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa il modulo per il testing di HttpClient
import { FormsModule } from '@angular/forms';
import { AddremoveComponent } from './add-remove/add-remove.component';
import { MenuComponent } from '../menu/menu.component';
import { LogoutComponent } from '../logout/logout.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, AddremoveComponent, MenuComponent, LogoutComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('fetchUsers has been called', ()=>{
    spyOn(component, 'fetchUsers');
    component.fetchUsers();
    expect(component.fetchUsers).toHaveBeenCalled();
  })
  
});

