import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { NgxXml2jsonService } from 'ngx-xml2json';

import { ValidatorServiceService } from '../validator/validator-service.service';
import { ParserUtilService } from '../parser-util/parser-util.service';
import { MatTableDataSource } from '@angular/material/table';
import { iRecord, iErrorType, iXMLParseRecords } from '../parser.types';


@Component({
  selector: 'app-csv-parser',
  templateUrl: './csv-parser.component.html',
  styleUrls: ['./csv-parser.component.scss']
})
export class CsvParserComponent {
  records: iRecord[] = [];
  errorList: iErrorType[] = [];
  dataSource: any;

  isValid: boolean;
  isParseCSVError: boolean;
  isParseXMLError: boolean;

  header = true;
  delimiter = ',';
  value = '';

  displayedColumns: string[] = ['reference', 'description', 'reason'];

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private ngxXml2jsonService: NgxXml2jsonService,
    private validatorService: ValidatorServiceService,
    private parserUtilService: ParserUtilService
    ) {}


  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  fileChangeListener($event: any): void {
    this.errorList = [];
    const files = $event.target.files;

    if (files[0].type !== 'text/xml') {
      this.parseCSV(files[0]);
    } else {
      const reader = new FileReader();
      reader.onload = this.parseXML;
      reader.readAsText(files[0]);
    }
  }

  parseCSV = (file) => {
    this.ngxCsvParser.parse(file, { header: this.header, delimiter: this.delimiter })
      .pipe().subscribe((result: Array<any>) => {
        this.isParseCSVError = false;
        this.parserUtilService.parseKeys(result).subscribe( (parsedResult: iRecord[]) => {
          this.records = parsedResult;
          this.validateRecords();
        }, (error) => {
          this.isParseCSVError = true;
          this.records = [];
        });
      }, (error: NgxCSVParserError) => {
        this.isParseCSVError = true;
      });
  }

  parseXML = (event: any) => {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(event.target.result, 'text/xml');
      const xmlRecords: iXMLParseRecords = <iXMLParseRecords>this.ngxXml2jsonService.xmlToJson(xml);
      this.isParseXMLError = false;

      this.parserUtilService.parseXMLKeys(xmlRecords.records.record).subscribe( (parsedResult: iRecord[]) => {
        this.records = parsedResult;
        this.validateRecords();
      },(error) => {
        this.isParseXMLError = true;
        this.records = [];
      });
    } catch(error) {
      this.isParseXMLError = true;
    }
  }

  validateRecords = () => {
    this.errorList.push(
      ...this.validatorService.validateDuplicates(this.records),
      ...this.validatorService.validateEndBalance(this.records)
    );
    if(this.errorList.length === 0) {
      this.isValid = true;
      this.dataSource = undefined;
      return;
    }
    this.isValid = false;
    this.setTableDataSource();
  }

  setTableDataSource = () => {
      this.dataSource = new MatTableDataSource(this.errorList);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}
