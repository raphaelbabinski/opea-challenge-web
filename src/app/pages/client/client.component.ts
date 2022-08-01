import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ClientService } from 'src/app/core/services/client.service';
import { CompanySizeService } from 'src/app/core/services/company-size.service';
import { ClientViewModel } from 'src/app/core/services/interface/clientViewModel';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  private routerSubs: Subscription;
  clientForm: FormGroup;
  companySizes: any;
  identifier: string = "";

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private companySizeService: CompanySizeService,) {
      this.clientForm = this.formBuilder.group({
        id:[],
        identifier:[],
        name: ['', [Validators.required, Validators.minLength(2)]],
        companySizeId: ['', [Validators.required]],
      });

      this.routerSubs = this.route.params.subscribe(async params => {
        if (params && params.identifier) {
          this.identifier = params.identifier;
          await this.loadClient();
        }
      });
   }

  async ngOnInit() {

    await this.loadCompanySize();
  }

  async loadCompanySize(){
    this.companySizes = await this.companySizeService.getAll();
  }

  async loadClient(){
    var client = await this.clientService.getById(this.identifier);
    this.clientForm.controls.id.setValue(client.id);
    this.clientForm.controls.identifier.setValue(client.identifier);
    this.clientForm.controls.name.setValue(client.name);
    this.clientForm.controls.companySizeId.setValue(client.companySizeId);
  }

  async save(){
    this.clientForm.markAllAsTouched();
    if (this.clientForm.valid) {
      try {

        let model: ClientViewModel = {
          name: this.clientForm.controls.name.value,
          companySizeId: parseInt(this.clientForm.controls.companySizeId.value),
        };

        if(this.clientForm.controls.identifier.value != null){
          model.id = this.clientForm.controls.id.value;
          model.identifier = this.clientForm.controls.identifier.value;
          await this.clientService.update(model);
        }else{
          await this.clientService.add(model);
        }
      }
      catch(err){
        alert('Ops! Encontramos um erro, estamos trabalhando para corrigi-lo.');
      }
      finally{
        this.router.navigate(['clients']).then();
      }
    }
    else{
      alert("Preencha os campos obrigatórios")
    }
  }

  back(){
    this.router.navigate(['clients']).then();
  }
}
