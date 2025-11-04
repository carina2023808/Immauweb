import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../../models/user';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isAuthenticated doit retourner vrai si un token existe', () => {
    localStorage.setItem(service['user'], 'mockToken');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('isAuthenticated doit retourner faux si aucun token n’existe', () => {
    localStorage.removeItem(service['user']);
    expect(service.isAuthenticated()).toBeFalse();
  });



  it('register doit retourner une réponse simulée', () => {
    const mockResponse = { success: true, message: 'Utilisateur enregistré' };
    const mockUser = { email: 'test@example.com', password: '123456' };

    spyOn(service, 'register').and.returnValue(of(mockResponse));

    service.register(mockUser).subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(res.message).toContain('enregistré');
    });
  });

  });
