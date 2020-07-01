import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { iRecordJSON, iRecord, iRecordXML } from '../parser.types';

@Injectable({
  providedIn: 'root'
})
export class ParserUtilService {

  parseKeys = (records: iRecordJSON[]): Observable<iRecord[]> => {
    try {
      return of(records.reduce( (acc, record) => {
        acc.push( Object.keys(record).reduce( (recordAcc, key) => {
          const camelCaseKey = this.toCamelCase(key);
          recordAcc[camelCaseKey] = record[key];
          return recordAcc;
        }, {}));
        return acc;
      }, []));
    } catch (err){
      return of([]);
    }

  }

  parseXMLKeys = (records: iRecordXML[]): Observable<iRecord[]> => {
    try {
      return of(records.reduce( (acc, record) => {
        acc.push( Object.keys(record).reduce( (recordAcc, key) => {
          if(key !== '#text'){
            if( key === '@attributes') {
              Object.assign(recordAcc, record[key]);
            } else {
              recordAcc[key] = record[key];
            }
          }
          return recordAcc;
        }, {}));
        return acc;
      }, []));
    } catch (err) {
      return of([]);
    }
  }

  toCamelCase(sentenceCase: string) {
    let out = '';
    sentenceCase.split(' ').forEach(function (el, idx) {
        var add = el.toLowerCase();
        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    return out;
  }
}
