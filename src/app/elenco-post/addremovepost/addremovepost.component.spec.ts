import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddremovepostComponent } from './addremovepost.component';
import { DataService } from '../../services/data.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AddremovepostComponent', () => {
  let component: AddremovepostComponent;
  let fixture: ComponentFixture<AddremovepostComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['addData', 'deleteData']);

    await TestBed.configureTestingModule({
      declarations: [AddremovepostComponent],
      imports: [FormsModule], // Per gestire [(ngModel)] nel template
      providers: [{ provide: DataService, useValue: mockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddremovepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the form visibility when toggleForm is called', () => {
    expect(component.isFormVisible).toBeFalse();
    component.toggleForm();
    expect(component.isFormVisible).toBeTrue();
    component.toggleForm();
    expect(component.isFormVisible).toBeFalse();
  });


  it('should call addData on DataService when onSubmit is called', () => {
    const mockResponse = { id: 1, title: 'Test Post', body: 'Test Body', user_id: '123' };
    mockDataService.addData.and.returnValue(of(mockResponse));

    component.post = { title: 'Test Post', body: 'Test Body', user_id: '123' };
    component.onSubmit();

    expect(mockDataService.addData).toHaveBeenCalledWith('/posts', component.post);
    expect(component.isFormVisible).toBeFalse();
  });

  it('should log an error if onSubmit fails', () => {
    const errorResponse = { status: 500, message: 'Server Error' };
    spyOn(console, 'error');
    mockDataService.addData.and.returnValue(throwError(errorResponse));

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Errore nella pubblicazione del post', errorResponse);
  });

  it('should call deleteData on DataService when onDelete is called', () => {
    mockDataService.deleteData.and.returnValue(of({}));

    component.id = '1';
    component.onDelete();

    expect(mockDataService.deleteData).toHaveBeenCalledWith('/posts/1');
    expect(component.isFormVisible1).toBeFalse();
  });

  it('should log an error if onDelete fails', () => {
    const errorResponse = { status: 500, message: 'Server Error' };
    spyOn(console, 'error');
    mockDataService.deleteData.and.returnValue(throwError(errorResponse));

    component.onDelete();

    expect(console.error).toHaveBeenCalledWith('Errore nella pubblicazione del post', errorResponse);
  });


});
