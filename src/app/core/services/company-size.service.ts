import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanySizeService {

  constructor(private http: HttpClient) { }

  async getAll() : Promise<any> {
    return this.http.get('https://localhost:44396/company-size').toPromise();
  }
}
