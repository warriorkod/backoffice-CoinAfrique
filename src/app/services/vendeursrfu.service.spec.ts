import { TestBed } from '@angular/core/testing';

import { VendeursrfuService } from './vendeursrfu.service';

describe('VendeursrfuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendeursrfuService = TestBed.get(VendeursrfuService);
    expect(service).toBeTruthy();
  });
});
