import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    // Mock AuthService
    const authServiceMock = {
      getToken: jasmine.createSpy('getToken').and.returnValue('mock-token')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get protected data', () => {
    const mockData = { id: 1, name: 'John Doe' };
    const endpoint = 'users/1';

    service.getProtectedData(endpoint).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${endpoint}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockData);
  });

  it('should add data', () => {
    const mockData = { id: 2, name: 'Jane Doe' };
    const endpoint = 'users';
    const requestData = { name: 'Jane Doe' };

    service.addData(endpoint, requestData).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    expect(req.request.body).toEqual(requestData);
    req.flush(mockData);
  });

  it('should delete data', () => {
    const endpoint = 'users/1';

    service.deleteData(endpoint).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(null);
  });
});
