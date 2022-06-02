import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css']
})
export class PropertyTypeComponent implements OnInit {
 isClicked:boolean= false;
 isClicked1:boolean= false;
 isHide:boolean= false;
 isHide1:boolean= false;
  isOption: boolean =true;

  constructor() { }

  ngOnInit(): void {
  }

  property()
  {
    this.isClicked= !this.isClicked;
  }

  property1()
  {
    this.isClicked1= true;
    this.isHide= true;
  }
  property2()
  {
    this.isClicked1= false;
  }
  hotel()
  {
    this.isHide= false;
    this.isClicked1= false;
  }
hotel1()
  {
    this.isHide1= true;
    this.isClicked1= false;
  }

  showTOption() {
    this.isOption = !this.isOption
  }

}
