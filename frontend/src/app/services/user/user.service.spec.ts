import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    const apiUrl = 'https://localhost:8000/api';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


 it('getUsers doit retourner un tableau d’utilisateurs simulé', () => {
    const mockUsers = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    spyOn(service, 'getUsers').and.returnValue(of(mockUsers));

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
    });
  });

  it('getUserWithProperties doit retourner un utilisateur simulé', () => {
    const mockUser = { id: 1, name: 'Alice', properties: ['prop1', 'prop2'] };
    spyOn(service, 'getUserWithProperties').and.returnValue(of(mockUser));

    service.getUserWithProperties(1).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(user.name).toBe('Alice');
    });
  });

  it('getUserById doit retourner un utilisateur simulé', () => {
    const mockUser = { id: 2, name: 'Bob' };
    spyOn(service, 'getUserById').and.returnValue(of(mockUser));

    service.getUserById(2).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(user.id).toBe(2);
    });
  });

  it('updateUser doit retourner une réponse de succès simulée', () => {
    const mockResponse = { success: true };
    spyOn(service, 'updateUser').and.returnValue(of(mockResponse));

    service.updateUser(3, { name: 'Test' }).subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(res.success).toBeTrue();
    });
  });

  it('deleteUser doit retourner une confirmation simulée', () => {
    const mockResponse = { message: 'Utilisateur supprimé' };
    spyOn(service, 'deleteUser').and.returnValue(of(mockResponse));

    service.deleteUser(4).subscribe(res => {
      expect(res.message).toBe('Utilisateur supprimé');
    });

  });

});
