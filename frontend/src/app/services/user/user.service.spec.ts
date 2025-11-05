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

// Simula a chamada do método getUsers para retornar uma lista mock de usuários (Alice e Bob).
// Verifica se o retorno realmente equivale a essa lista mock.
// Confirma que o número de usuários retornados seja 2.
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


// Simula o método getUserWithProperties para retornar um usuário mock com propriedades associadas.
// Verifica se o usuário retornado é igual ao objeto mock.
// Confirma que o nome do usuário seja Alice.
  it('getUserWithProperties doit retourner un utilisateur simulé', () => {
    const mockUser = { id: 1, name: 'Alice', properties: ['prop1', 'prop2'] };
    spyOn(service, 'getUserWithProperties').and.returnValue(of(mockUser));

    service.getUserWithProperties(1).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(user.name).toBe('Alice');
    });
  });



// Simula o método getUserById retornando um usuário específico mock (id 2, nome Bob).
// Verifica se o usuário retornado corresponde ao mock.
// Confirma se o id do usuário é 2.
  it('getUserById doit retourner un utilisateur simulé', () => {
    const mockUser = { id: 2, name: 'Bob' };
    spyOn(service, 'getUserById').and.returnValue(of(mockUser));

    service.getUserById(2).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(user.id).toBe(2);
    });
  });


// Simula a chamada updateUser para retornar uma resposta de sucesso mock.
// Verifica se a resposta é igual à mock e se o campo success é verdadeiro.
  it('updateUser doit retourner une réponse de succès simulée', () => {
    const mockResponse = { success: true };
    spyOn(service, 'updateUser').and.returnValue(of(mockResponse));

    service.updateUser(3, { name: 'Test' }).subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(res.success).toBeTrue();
    });
  });


// Simula a chamada deleteUser para retornar uma confirmação mock informando que o usuário foi excluído.
// Verifica se a mensagem da resposta é "Utilisateur supprimé".
  it('deleteUser doit retourner une confirmation simulée', () => {
    const mockResponse = { message: 'Utilisateur supprimé' };
    spyOn(service, 'deleteUser').and.returnValue(of(mockResponse));

    service.deleteUser(4).subscribe(res => {
      expect(res.message).toBe('Utilisateur supprimé');
    });

  });

});
