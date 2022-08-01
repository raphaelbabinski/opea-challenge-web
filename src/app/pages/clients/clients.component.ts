import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: any;

  constructor(private clientService: ClientService,
              private router: Router) { }

  async ngOnInit() {
    this.loadPage();
  }

  async loadPage(){
    this.clients = await this.clientService.getAll();
    var teste =  this.clients;
  }

  detaislClient(identifier:any){
    if(identifier == null){
      this.router.navigate(['client',]).then();
    }else{
      this.router.navigate(['client', identifier,]).then();
    }
  }

  async removeClient(identifier:any){
    await this.clientService.remove(identifier);
    this.loadPage();
  }
}
