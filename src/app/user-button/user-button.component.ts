import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, User } from '../data/data.service';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent {
  users: Observable<User[]>;

  @Output() selectedUser: EventEmitter<User> = new EventEmitter();

  constructor(private data: DataService) {
    this.users = this.data.getUsers();
  }

  selectUser(user: User) {
    this.selectedUser.next(user);
  }
}
