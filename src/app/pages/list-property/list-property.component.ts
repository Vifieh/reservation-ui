import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {
  stars:string[]= ['N/A', '1 *', '2 **', '3 ***', '4 ****', '5 *****'];

  constructor() { }

  ngOnInit(): void {
  }

}
