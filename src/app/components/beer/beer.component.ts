import { Component, Input } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../models/beer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styles: [],
})
export class BeerComponent {
  @Input() beer: Beer;

  constructor(public beerService: BeerService, private router: Router) {}

  editBeer(beer: Beer) {
    this.router.navigate(['/edit', beer.id.toString()]);
  }

  deleteBeer(item: Beer) {
    this.beerService.deleteBeer(item);
  }
}
