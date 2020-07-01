export const csvMock = [
  {
    "Account Number": "NL69ABNA0433647324",
    "Description": "Flowers van Robin",
    "End Balance": "16.00",
    "Mutation": "-7.00",
    "Reference": "156108",
    "Start Balance": "13.92",
  },
  {
    "Account Number": "NL69ABNA0433647324",
    "Description": "Flowers from Erik de Vries",
    "End Balance": "6.67",
    "Mutation": "+7.25",
    "Reference": "156108",
    "Start Balance": "13.92",
  }
];

export const xmlMock = [
  {
    "accountNumber": "NL69ABNA0433647324",
    "description": "Flowers van Robin",
    "endBalance": "16.00",
    "mutation": "-7.00",
    "@attribute": {"reference": 156108},
    "startBalance": "13.92",
  },
  {
    "accountNumber": "NL69ABNA0433647324",
    "description": "Flowers from Erik de Vries",
    "endBalance": "6.67",
    "mutation": "+7.25",
    "@attribute": {"reference": 156108},
    "startBalance": "13.92",
  }
];

export const parsedCsvXmlMock = [
  {
    "accountNumber": "NL69ABNA0433647324",
    "description": "Flowers van Robin",
    "endBalance": "16.00",
    "mutation": "-7.00",
    "reference": 156108,
    "startBalance": "13.92",
  },
  {
    "accountNumber": "NL69ABNA0433647324",
    "description": "Flowers from Erik de Vries",
    "endBalance": "6.67",
    "mutation": "+7.25",
    "reference": 156108,
    "startBalance": "13.92",
  }
]

export const parsedCsvXmlValidMock = [
  {
    "accountNumber": "NL69ABNA0433647324",
    "description": "Flowers van Robin",
    "endBalance": "16.00",
    "mutation": "-7.00",
    "reference": 156108,
    "startBalance": "9.00",
  },
  {
    "accountNumber": "NL69ABNA0433647324",
    "description": "Flowers from Erik de Vries",
    "endBalance": "6.67",
    "mutation": "+7.25",
    "reference": 156107,
    "startBalance": "13.92",
  }
]

export const errorListMock = [
  {
    "reference": 156108,
    "description": "Flowers van Robin",
    "reason": "Duplicate Records"
  },
  {
    "reference": 156108,
    "description": "Flowers from Erik de Vries",
    "reason": "Duplicate Records"
  },
  {
    "reference": 156108,
    "description": "Flowers from Erik de Vries",
    "reason": "End Balance mismatch. Expected 13.92 but found 9.00"
  },

]
