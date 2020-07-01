import { TestBed } from '@angular/core/testing';

import { ParserUtilService } from './parser-util.service';
import { csvMock, parsedCsvXmlMock, xmlMock } from '../parse.mocks';
import { iRecord } from '../parser.types';

describe('ParserUtilService', () => {
  let service: ParserUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse CSV object in parseKeys() into uniform camelCased key format', () => {
    service.parseKeys(csvMock).subscribe( (result: iRecord[]) => {
      expect(result).toEqual(parsedCsvXmlMock);
    })

  });

  it('should return blank array if null is passed to parseKeys()', () => {
    service.parseKeys(null).subscribe( (result: iRecord[]) => {
      expect(result).toEqual([]);
    })
  });

  it('should parse XML object in parseXMLKeys into uniform format', () => {
    service.parseXMLKeys(xmlMock).subscribe( (result: iRecord[]) => {
      expect(result).toEqual(parsedCsvXmlMock);
    })

  });

  it('should return blank array if null is passed to parseXMLKeys()', () => {
    service.parseXMLKeys(null).subscribe( (result: iRecord[]) => {
      expect(result).toEqual([]);
    })
  });

  it('should convert a text into camelCase when passed to toCamelCase()', () => {
    const camelCasedText = service.toCamelCase('Account Number');
    expect(camelCasedText).toEqual('accountNumber');
  });
});
