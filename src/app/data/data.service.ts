import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';

export type User = {
  name: string;
  firstName: string;
  id: number;
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) {
    this.getPosts().subscribe(i => console.log('test', i));
  }

  getComments() {
    return this.getRequest<Comment[]>('comments');
  }

  getPosts() {
    return this.getRequest<Post[]>('posts');
  }

  getUsers() {
    return this.getRequest<{
      address: any;
      company: any;
      email: string;
      id: number;
      name: string;
      phone: string;
      username: string;
      website: string;
    }[]>('users').pipe(
      map(users => {
        return users.map((user) => {
          const names = user.name.split(' ');
          return {
            name: user.name,
            firstName: names[0] === 'Mrs.' ? names[1] : names[0],
            id: user.id
          }
        })
      })
    )
  }

  getRequest<T>(api: 'users' | 'posts' | 'comments') {
    return this.http.get<T>(`https://jsonplaceholder.typicode.com/${api}`).pipe(delay(1000));
  }
}
