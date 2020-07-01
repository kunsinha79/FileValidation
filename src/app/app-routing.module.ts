import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParserComponent } from './parser/parser.component';


const routes: Routes = [
  { path: '', redirectTo: 'parser', pathMatch: 'full' },
  { path: 'parser', component: ParserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
