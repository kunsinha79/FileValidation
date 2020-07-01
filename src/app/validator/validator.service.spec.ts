import { TestBed } from '@angular/core/testing';

import { ValidatorService } from './validator.service';
import { parsedCsvXmlMock, errorListMock } from '../parse.mocks';

describe('ValidatorServiceService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of duplicate records if invalid set is passed', () => {
    const errorList = service.validateDuplicates(parsedCsvXmlMock);
    expect(errorList).toEqual([errorListMock[0], errorListMock[1]]);
  });

  it('should return an array of transaction invalid records if invalid set is passed', () => {
    const errorList = service.validateEndBalance(parsedCsvXmlMock);
    expect(errorList).toEqual([errorListMock[2], errorListMock[3]]);
  });
});
