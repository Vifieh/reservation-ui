import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {CountryService} from "../../services/country-service/country.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  submitted = false;
  subscriptions: Subscription[] = []

  constructor(
    public formBuilder: FormBuilder,
    private countryService: CountryService,
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  createCountryForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
    }
  );

  get formValues(): { [key: string]: AbstractControl } {
    return this.createCountryForm.controls;
  }

  createCountry() {
    this.submitted  = true
    if (!this.createCountryForm.valid) {
      alert("please fill field in the form")
    } else {
      const createCountrySub = this.countryService.createCountry(this.createCountryForm.value)
        .subscribe(response => {
          alert(response)
    })
    this.subscriptions.push(createCountrySub);
    }
  }

}
