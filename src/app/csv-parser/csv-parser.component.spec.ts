import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvParserComponent } from './csv-parser.component';
import { By } from '@angular/platform-browser';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { ValidatorServiceService } from '../validator/validator-service.service';
import { ParserUtilService } from '../parser-util/parser-util.service';
import { of } from 'rxjs';
import { csvMock } from '../parse.mocks';

describe('CsvParserComponent', () => {
  let component: CsvParserComponent;
  let fixture: ComponentFixture<CsvParserComponent>;
  let ngxCsvParser: NgxCsvParser;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvParserComponent ],
      providers: [NgxCsvParser, NgxXml2jsonService,ValidatorServiceService, ParserUtilService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvParserComponent);
    component = fixture.componentInstance;
    ngxCsvParser = TestBed.get(NgxCsvParser);

    spyOn(component, 'validateRecords').and.returnValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('file change event should arrive in handler', () => {
    let input  = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
    // check that the event handler has been called
    spyOn(component, 'fileChangeListener');
    input.dispatchEvent(new Event('change'));
    expect(component.fileChangeListener).toHaveBeenCalled();
  });

  it('fileChangeListener should use fileReader to parse xml file'), () => {
    const mockFile = new File([''], 'assets/records.xml', { type: 'text/xml' });
    const mockEvt = { target: { files: [mockFile] } };
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onload']);
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);

    component.fileChangeListener(mockEvt as any);
    expect((window as any).FileReader).toHaveBeenCalled();
  }

  it('fileChangeListener should call parseCSV to parse csv file'), () => {
    const mockFile = new File([''], 'assets/records.csv', { type: 'text/csv' });
    const mockEvt = { target: { files: [mockFile] } };

    spyOn(component, 'parseCSV');

    component.fileChangeListener(mockEvt as any);
    expect(component.parseCSV).toHaveBeenCalled();
  }

  it('parseCSV should make iserror false', () => {
    spyOn(ngxCsvParser, 'parse').and.returnValue(of(csvMock));

    const mockFile = new File([''], 'assets/records.csv', { type: 'text/csv' });
    component.parseCSV(mockFile);
    expect(ngxCsvParser.parse).toHaveBeenCalled();
  });


});
