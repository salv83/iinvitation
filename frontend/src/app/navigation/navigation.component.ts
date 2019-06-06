import { Component, OnInit } from '@angular/core';
import { Nav } from '../model/nav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menu: Nav[];

  constructor() { 
    this.menu = [
      {label: 'Sender', url: 'sender'},
      {label: 'Invited', url: 'invited'}
    ];
  }

  ngOnInit() {
  }

}
