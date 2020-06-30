import { Injectable } from '@angular/core';

import { iRecord } from '../parser.types';

@Injectable({
  providedIn: 'root'
})
export class ValidatorServiceService {

  constructor() { }

  validateDuplicates = (records: iRecord[]): any[] => {
    const sortedRecords = records.sort( (a, b) => a.reference - b.reference);

    return sortedRecords.reduce((acc, record) => {
      if(sortedRecords.filter(rec => rec.reference === record.reference).length > 1) {
        const {reference, description} = record;
        acc.push({reference, description, reason: 'Duplicate Record'});
      }
      return acc;
    }, [])

  };

  validateEndBalance = (arr: iRecord[]): any[] => {
    const sortedRecords = arr.slice().sort();
    const regex = /^\+/;
    return sortedRecords.reduce( (acc, item) => {
      const endBalance = item.mutation.match(regex)
                          ? this.sum(item.startBalance, item.mutation.split('+')[1])
                          : this.subtract(item.startBalance, item.mutation.split('-')[1]);
      if(parseFloat(item.endBalance) !== endBalance) {
        const {reference, description} = item;
        acc.push({reference, description, reason: `End Balance mismatch. Expected ${item.endBalance} but found ${endBalance}`});
      }
      return acc;
    }, []);
  }

  private sum = (startBalance: string, transactionAmt: string) => {
    return parseFloat(startBalance) + parseFloat(transactionAmt);
  }

  private subtract = (startBalance: string, transactionAmt: string) => {
    return parseFloat(startBalance) - parseFloat(transactionAmt);
  }
}
