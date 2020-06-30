import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { iRecordJSON, iRecord, iRecordXML } from '../parser.types';

@Injectable({
  providedIn: 'root'
})
export class ParserUtilService {

  parseKeys = (arr: iRecordJSON[]): Observable<iRecord[]> => {
    return of(arr.reduce( (acc, item) => {
      acc.push( Object.keys(item).reduce( (a, b) => {
        const camelCaseKey = this.toCamelCase(b);
        a[camelCaseKey] = item[b];
        return a;
      }, {}));
      return acc;
    }, []));
  }

  parseXMLKeys = (arr: iRecordXML[]): Observable<iRecord[]> => {
    return of(arr.reduce( (acc, item) => {
      acc.push( Object.keys(item).reduce( (a, b) => {
        if(b !== '#text'){
          if( b === '@attributes') {
            Object.assign(a, item[b]);
          } else {
            a[b] = item[b];
          }
        }
        return a;
      }, {}));
      return acc;
    }, []));
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
