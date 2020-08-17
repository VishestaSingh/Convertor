import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';;
import { HomeComponent } from './home/home.component'
import { ConverterComponent } from './converter/converter.component';
import { TrendsComponent } from './trends/trends.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Convert/:currency', component: ConverterComponent },
  { path: 'Trends/:currency', component: TrendsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
