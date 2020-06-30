import { TestBed } from '@angular/core/testing';

import { ParserUtilService } from './parser-util.service';

describe('ParserUtilService', () => {
  let service: ParserUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
