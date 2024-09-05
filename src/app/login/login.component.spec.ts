import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['saveToken', 'verifyToken', 'isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the token and navigate to /home if authenticated', () => {
    component.token = 'valid-token';
    authService.verifyToken.and.returnValue(of({ valid: true }));
    authService.isAuthenticated.and.returnValue(true);
    component.login();
    expect(authService.saveToken).toHaveBeenCalledWith('valid-token');
    expect(authService.verifyToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should log an error if token is invalid (401)', () => {
    component.token = 'invalid-token';
    authService.verifyToken.and.returnValue(throwError({ status: 401 }));
    spyOn(console, 'log'); 
    component.login();
    expect(authService.saveToken).toHaveBeenCalledWith('invalid-token');
    expect(console.log).toHaveBeenCalledWith('Token non valido o scaduto', { status: 401 });
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should log an unexpected error if another error occurs', () => {
    component.token = 'error-token';
    authService.verifyToken.and.returnValue(throwError({ status: 500 }));
    spyOn(console, 'log');
    component.login();
    expect(authService.saveToken).toHaveBeenCalledWith('error-token');
    expect(console.log).toHaveBeenCalledWith('Si è verificato un errore inaspettato:', { status: 500 });
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should bind token input with [(ngModel)]', () => {
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('.input')).nativeElement;
    inputEl.value = 'test-token';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.token).toBe('test-token');
  });

  it('should call login when login button is clicked', () => {
    spyOn(component, 'login');
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();
    expect(component.login).toHaveBeenCalled();
  });
});

