import { TestBed } from '@angular/core/testing';

import { HistoriqueSalleService } from './historique-salle.service';

describe('HistoriqueSalleService', () => {
  let service: HistoriqueSalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueSalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
