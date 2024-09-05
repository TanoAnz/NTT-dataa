import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSocialComponent } from './card-social.component';
import { User } from '../../models/User.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardSocialComponent', () => {
  let component: CardSocialComponent;
  let fixture: ComponentFixture<CardSocialComponent>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active', 
    gender: 'male'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSocialComponent ],
      imports:[RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSocialComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly handle the input user', () => {
    expect(component.user).toEqual(mockUser);
  });

  it('should return true if status is active', () => {
    const status = 'active';
    expect(component.isOnline(status)).toBeTrue();
  });

  it('should return false if status is not active', () => {
    const status = 'inactive';
    expect(component.isOnline(status)).toBeFalse();
  });

  it('should return false if status is empty', () => {
    const status = '';
    expect(component.isOnline(status)).toBeFalse();
  });
});

