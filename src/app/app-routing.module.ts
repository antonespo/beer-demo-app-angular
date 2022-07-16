import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BeerFormComponent } from './components/beer-form/beer-form.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Route[] = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'add', component: BeerFormComponent },
  { path: 'edit/:id', component: BeerFormComponent },
  { path: 'list', component: BeerListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
