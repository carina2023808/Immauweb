import { TestBed } from '@angular/core/testing';

import { PropertyService } from './property.service';
import { of } from 'rxjs';

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updateProperty doit retourner une réponse simulée de succès', () => {
    const mockResponse = { success: true, message: 'Propriété mise à jour' };
    const formData = new FormData();
    formData.append('titre', 'Nouvelle maison');

    spyOn(service, 'updateProperty').and.returnValue(of(mockResponse));

    service.updateProperty(1, formData).subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(res.message).toContain('mise à jour');
    });
  });

  it('deleteProperty doit retourner une réponse simulée de suppression', () => {
    const mockResponse = { success: true, message: 'Propriété supprimée' };

    spyOn(service, 'deleteProperty').and.returnValue(of(mockResponse));

    service.deleteProperty(1).subscribe(res => {
      expect(res.success).toBeTrue();
      expect(res.message).toBe('Propriété supprimée');
    });
  });
});
