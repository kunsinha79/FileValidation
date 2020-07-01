export interface iRecord {
  reference: number;
  accountNumber: string;
  description: string;
  endBalance: string;
  mutation: string;
  startBalance: string;
}

export interface iErrorType {
  reference: number;
  description: string;
  reason: string;
}

export interface iRecordJSON {
  "Reference": number;
  'Account Number': string;
  'Description': string;
  'End Balance': string;
  'Mutation': string;
  'Start Balance': string;
}


export interface iRecordXML {
  '@attribute': {'reference': number};
  'accountNumber': string;
  'description': string;
  'endBalance': string;
  'mutation': string;
  'startBalance': string;
}

export interface iXMLParseRecords {
  records: {
    record: iRecordXML[]
  }
}
