import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  stars:string[]= ['N/A', '1 *', '2 **', '3 ***', '4 ****', '5 *****'];

  constructor() { }

  ngOnInit(): void {
  }

}
