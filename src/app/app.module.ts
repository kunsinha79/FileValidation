import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParserComponent } from './parser/parser.component';
import { ValidatorService } from './validator/validator.service';
import { ParserUtilService } from './parser-util/parser-util.service';

@NgModule({
  declarations: [
    AppComponent,
    ParserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    ValidatorService,
    ParserUtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
