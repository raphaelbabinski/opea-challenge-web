import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientViewModel } from './interface/clientViewModel';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http: HttpClient) { }

  async getById(identifier:string) : Promise<any> {
    return this.http.get('https://localhost:44396/client/' + identifier).toPromise();
  }

  async getAll() : Promise<any> {
    return this.http.get('https://localhost:44396/client').toPromise();
  }

  async add(body: ClientViewModel) : Promise<any> {
    const headers = {
      'Content-Type': 'application/json'
    };

    var result = this.http.post('https://localhost:44396/client', body).toPromise();

    return result;
  }

  async update(body: ClientViewModel) : Promise<any> {
    const headers = {
      'Content-Type': 'application/json'
    };
    var result = this.http.put('https://localhost:44396/client', body).toPromise();

    return result;
  }

  async remove(identifier:string) : Promise<any> {
    return this.http.delete('https://localhost:44396/client/' + identifier).toPromise();
  }
}
