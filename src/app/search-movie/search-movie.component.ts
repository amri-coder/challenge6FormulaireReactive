import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss'],
})
export class SearchMovieComponent {
  submitted: boolean = false;
  currentDateInYear = new Date().getFullYear();
  dateInYearMinimal: number = 1900;
  optionsFiche = ['complete', 'courte'];
  onForm = this.formBuilder.group({
    identifiant: ['', Validators.required],
    titre: ['', Validators.required],
    type: ['', Validators.required],
    anneeDeSortie: [
      '',
      [Validators.required, this.rangeDateValidator.bind(this)],
    ],
    fiche: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    this.ficheInitialisation();
  }

  ngOnInit() {}
  rangeDateValidator(control: FormControl) {
    let yearDateCurrent = new Date().getFullYear();
    const yearDateMinimal = 1900;
    const yearEnteredByUser = control.value;
    if (
      yearEnteredByUser > yearDateCurrent ||
      yearEnteredByUser < yearDateMinimal
    ) {
      return { invalidDate: true };
    } else {
      return null;
    }
  }
  ficheInitialisation() {
    this.onForm.controls.fiche.patchValue('courte');
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.onForm.value);
    this.onForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
