import { Component, OnInit } from '@angular/core';
import {Default} from '../../enum/default';
import {Status} from '../../enum/status';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  days: string[] = ['Day arrival (18:00)', '1 day', '2 days', '3 days', '7 days', '14 days'];
  pays: string[] = ['of the first night', 'of the full stay'];
  petsAllowed = [
    {key: Default.NO, value: 'No'},
    {key: Default.YES, value: 'Yes'},
    {key: Default.UPON_REQUEST, value: 'Upon Request'},
  ];
  charges = [
    {key: Status.FREE, value: 'Pets can stay for free'},
    {key: Status.PAID, value: 'Charges may apply'},
  ];
  isDisplayed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkStatus(event: any) {
    this.isDisplayed = event.target.value !== 'NO';
  }
}
