import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token to localStorage', () => {
    const token = 'test-token';
    service.saveToken(token);
    expect(localStorage.getItem('auth_token')).toBe(token);
  });

  it('should retrieve token from localStorage', () => {
    const token = 'test-token';
    localStorage.setItem('auth_token', token);
    expect(service.getToken()).toBe(token);
  });

  it('should return true if token is present', () => {
    localStorage.setItem('auth_token', 'test-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if token is not present', () => {
    localStorage.removeItem('auth_token');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should verify token and return a successful response', () => {
    const token = 'test-token';
    const mockResponse = { data: 'test' };

    spyOn(service, 'getToken').and.returnValue(token);

    service.verifyToken().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error on verify token', () => {
    const token = 'test-token';
    const errorResponse = { status: 401, statusText: 'Unauthorized' };

    spyOn(service, 'getToken').and.returnValue(token);

    service.verifyToken().subscribe(
      () => fail('Expected an error, but the request succeeded'),
      (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Unauthorized');
      }
    );

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    req.flush('Unauthorized', errorResponse);
  });

  it('should logout and navigate to the home page', () => {
    service.logout();
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should get users from API', () => {
    const mockUsers = [{ id: 1, name: 'User 1' }];
    const token = 'test-token';

    spyOn(service, 'getToken').and.returnValue(token);

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users?per_page=10&page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should add user to API', () => {
    const newUser = { name: 'New User' };
    const token = 'test-token';
    const mockResponse = { id: 1, ...newUser };

    spyOn(service, 'getToken').and.returnValue(token);

    service.addUser(newUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(mockResponse);
  });

  it('should delete user from API', () => {
    const userId = 1;
    const token = 'test-token';

    spyOn(service, 'getToken').and.returnValue(token);

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});

