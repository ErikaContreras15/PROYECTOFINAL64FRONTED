import { TestBed } from '@angular/core/testing';

import { ActualizarClienteService } from './actualizar-cliente.service';

describe('ActualizarClienteService', () => {
  let service: ActualizarClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
