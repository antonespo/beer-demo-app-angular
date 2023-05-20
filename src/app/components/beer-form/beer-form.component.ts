import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allBeerTypes, Beer, BeerForm } from '../../models/beer.model';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styles: [],
})
export class BeerFormComponent implements OnInit {
  isEdit: boolean;
  beerToEdit: Beer | undefined = undefined;
  beerForm: FormGroup<BeerForm>;
  beerTypes = allBeerTypes;

  constructor(
    public beerService: BeerService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.beerForm = this._initForm();
  }

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.url[0].path === 'edit';
    if (this.isEdit) {
      const id = +this.route.snapshot.params?.id;
      this.beerToEdit = this.beerService.getBeerById(id);
      if (!this.beerToEdit) {
        this.router.navigate(['/list']);
      }
    }
    this.beerForm = this._initForm();
  }

  onSubmit(): void {
    const beerFromForm = this.beerForm.value;
    const beer: Beer = {
      beerName: beerFromForm.beerName!,
      beerStyle: beerFromForm.beerStyle!,
      price: beerFromForm.price!,
      upc: beerFromForm.upc!,
      id: this.isEdit ? this.beerToEdit!.id : this.beerService.generateId(),
      createdDate: this.isEdit ? this.beerToEdit!.createdDate : new Date(),
      lastModifiedDate: new Date(),
    };

    console.log(beer);

    if (this.isEdit) {
      this.beerService.updateBeer(beer);
    } else {
      this.beerService.addBeer(beer);
    }
  }

  isFormFieldInvalid(formControl: string): boolean {
    return (
      this.beerForm.controls[formControl].touched &&
      !this.beerForm.controls[formControl].valid
    );
  }

  private _initForm(): FormGroup<BeerForm> {
    return new FormGroup<BeerForm>({
      beerName: new FormControl(
        this.beerToEdit ? this.beerToEdit.beerName : null,
        Validators.required
      ),
      beerStyle: new FormControl(
        this.beerToEdit ? this.beerToEdit.beerStyle : null,
        Validators.required
      ),
      upc: new FormControl(
        this.beerToEdit ? this.beerToEdit.upc : null,
        Validators.required
      ),
      price: new FormControl(
        this.beerToEdit ? this.beerToEdit.price : null,
        Validators.required
      ),
    });
  }
}
