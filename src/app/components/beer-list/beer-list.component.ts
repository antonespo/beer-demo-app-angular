import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styles: [],
})
export class BeerListComponent {
  constructor(public beerService: BeerService) {}
}
