import { TestBed } from '@angular/core/testing';

import { AnnonceRfuService } from './annoncesrfu.service';

describe('AnnoncesrfuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnonceRfuService = TestBed.get(AnnonceRfuService);
    expect(service).toBeTruthy();
  });
});
