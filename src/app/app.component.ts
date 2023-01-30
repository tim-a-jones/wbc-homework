import { Component } from '@angular/core';
import { DataService, User } from './data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeUser: User | undefined;
  constructor(public data: DataService) {}

  selectedUser(user: User) {
    this.activeUser = user;
  }
}
