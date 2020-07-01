# FileValidator
An application to upload csv ot xml file in a prticular format and report invalid transactions
# Case Study
An organization received csv or xml files of transaction records. 
Before moving further to bulk uploading, a utility is needed to verify the records for
  1. Duplicate reference number
  2. Invalid transaction calculation i.e. end balance mismatch
# Toolbox used :) 
Angular - 9
Nodejs - 12
"@angular/cli": "~9.1.4",
"@angular/material": "^9.2.4",
"ngx-csv-parser": "0.0.3",
"ngx-xml2json": "^1.0.2",
"jasmine-core": "~3.5.0",
..... many more in package.json

# To start
1. Clone and checkout
2. npm install
3. ng start - and hit localhost:4200
4. ng test - to run the unit tests

# Note
Must have node, angular cli installed locally
