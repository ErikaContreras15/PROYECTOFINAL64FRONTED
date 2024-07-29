import { TestBed } from '@angular/core/testing';

import { PrestamosUsuarioService } from './prestamos-usuario.service';

describe('PrestamosUsuarioService', () => {
  let service: PrestamosUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamosUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
