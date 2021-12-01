import { TestBed } from '@angular/core/testing';

import { PHPService } from './php.service';

describe('PHPService', () => {
  let service: PHPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PHPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
