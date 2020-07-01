import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ParserComponent } from './parser.component';
import { By } from '@angular/platform-browser';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { ValidatorService } from '../validator/validator.service';
import { ParserUtilService } from '../parser-util/parser-util.service';
import { of, throwError } from 'rxjs';
import { csvMock, errorListMock, parsedCsvXmlMock, parsedCsvXmlValidMock, xmlFromFileMock } from '../parse.mocks';

describe('ParserComponent', () => {
  let component: ParserComponent;
  let fixture: ComponentFixture<ParserComponent>;
  let ngxCsvParser: NgxCsvParser;
  let parserUtilService: ParserUtilService;
  let validatorService: ValidatorService;
  let ngxXml2jsonService: NgxXml2jsonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserComponent ],
      providers: [NgxCsvParser, NgxXml2jsonService, ValidatorService, ParserUtilService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserComponent);
    component = fixture.componentInstance;
    ngxCsvParser = TestBed.get(NgxCsvParser);
    parserUtilService = TestBed.get(ParserUtilService);
    validatorService = TestBed.get(ValidatorService);
    ngxXml2jsonService = TestBed.get(NgxXml2jsonService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fileChangeListener() on file change event', () => {
    let input  = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
    const mockFile = new File([''], 'records.xml', { type: 'text/xml' });
    spyOn(component, 'fileChangeListener');
    input.dispatchEvent(new Event('change'));
    expect(component.fileChangeListener).toHaveBeenCalled();
  });

  /*
  * Skipping this test case as somehow its not picked up by testrunner. I have to debug this.
  */
  xit('should call parseCSV when CSV file is uploaded'), () => {
    spyOn(ngxCsvParser, 'parse').and.returnValue(of(csvMock));
    const mockFile = new File([''], 'records.csv', { type: 'text/csv' });
    const mockEvt = { target: { files: [mockFile] } };

    spyOn(component, 'parseCSV');
    component.fileChangeListener(mockEvt);
    expect(component.parseCSV).toHaveBeenCalled();
  }

  /*
  * Start CSV parser test
  */
  it('should call validateRecords() and parseKeys() if ngxParser returns success', () => {
    spyOn(ngxCsvParser, 'parse').and.returnValue(of(csvMock));
    spyOn(parserUtilService, 'parseKeys').and.returnValue(of(parsedCsvXmlMock));
    spyOn(component, 'validateRecords').and.returnValue();

    const mockFile = new File([''], 'assets/records.csv', { type: 'text/csv' });
    component.parseCSV(mockFile);

    expect(ngxCsvParser.parse).toHaveBeenCalled();
    expect(parserUtilService.parseKeys).toHaveBeenCalled();
    expect(component.records).toEqual(parsedCsvXmlMock);
    expect(component.validateRecords).toHaveBeenCalled();
  });

  it('should not call validateRecords() and parseKeys() if parser throws error', () => {
    spyOn(ngxCsvParser, 'parse').and.returnValue(throwError({}));
    spyOn(component, 'validateRecords').and.returnValue();
    spyOn(parserUtilService, 'parseKeys');

    const mockFile = new File([''], 'assets/records.csv', { type: 'text/csv' });
    component.parseCSV(mockFile);

    expect(ngxCsvParser.parse).toHaveBeenCalled();
    expect(parserUtilService.parseKeys).not.toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.validateRecords).not.toHaveBeenCalled();
  });
  // end csv parsing test

  /*
  * Start XML parsing test
  */
  it('should call validateRecords() and parseXMLKeys() if ngxXml2jsonService returns success', () => {
    spyOn(ngxXml2jsonService, 'xmlToJson').and.returnValue({records: { record: csvMock}});
    spyOn(parserUtilService, 'parseXMLKeys').and.returnValue(of(parsedCsvXmlMock));
    spyOn(component, 'validateRecords').and.returnValue();

    component.parseXML( {target: { result: <any>xmlFromFileMock}});

    expect(ngxXml2jsonService.xmlToJson).toHaveBeenCalled();
    expect(parserUtilService.parseXMLKeys).toHaveBeenCalled();
    expect(component.records).toEqual(parsedCsvXmlMock);
    expect(component.validateRecords).toHaveBeenCalled();
  });

  it('should not call validateRecords() and parseXMLKeys() if ngxXml2jsonService throws error', () => {
    spyOn(ngxXml2jsonService, 'xmlToJson').and.returnValue(throwError({}));
    spyOn(component, 'validateRecords').and.returnValue();
    spyOn(parserUtilService, 'parseXMLKeys');

    component.parseXML( {target: { result: <any>xmlFromFileMock}});

    expect(ngxXml2jsonService.xmlToJson).toHaveBeenCalled();
    expect(parserUtilService.parseXMLKeys).not.toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.validateRecords).not.toHaveBeenCalled();
  });
  // end XML parsing test

  it('should have 3 error records in errorList when validateRecords() is invoked with invalid records', () => {
    spyOn(validatorService, 'validateDuplicates').and.returnValue([errorListMock[0], errorListMock[1]]);
    spyOn(validatorService, 'validateEndBalance').and.returnValue([errorListMock[2]]);

    component.records = parsedCsvXmlMock;
    component.validateRecords();

    expect(validatorService.validateDuplicates).toHaveBeenCalled();
    expect(validatorService.validateEndBalance).toHaveBeenCalled();
    expect(component.errorList).toEqual(errorListMock);
  });

  it('should have 0 error records in errorList when validateRecords() is invoked with valid records', () => {
    spyOn(validatorService, 'validateDuplicates').and.returnValue([]);
    spyOn(validatorService, 'validateEndBalance').and.returnValue([]);

    component.records = parsedCsvXmlValidMock;
    component.validateRecords();

    expect(validatorService.validateDuplicates).toHaveBeenCalled();
    expect(validatorService.validateEndBalance).toHaveBeenCalled();
    expect(component.errorList).toEqual([]);
  });

});
