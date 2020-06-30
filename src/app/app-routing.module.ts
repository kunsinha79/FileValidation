import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsvParserComponent } from './csv-parser/csv-parser.component';


const routes: Routes = [
  { path: '', redirectTo: 'parser', pathMatch: 'full' },
  { path: 'parser', component: CsvParserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
