import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseData} from '../../models/response-data'
import { ResponseValidation } from 'src/app/models/response-validation';
import notify from 'devextreme/ui/notify';
import { User } from 'src/app/models/user';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
  owners=[{}];
  fetching:boolean=false;
  formData: any = {};
  user:User={
    TipoDocumento: '',
    NumeroDocumento:'',
    PrimerNombre:'',
    SegundoNombre:'',
    PrimerApellido:'',
    SegundoApellido:'',
    CodigoEps:'',
    NombreEps:'',
    FechaAfiliacionEps:'',
    CertificadoEps: false,
    TipoCotizante:'',
    ValorUPC:0,
    CodigoAfp:{},
    NombreAfp:{},
    FechaAfiliacionAfp:{},
    CertificadoAfp:false,
    EsPensionado:false,
    EnTramitePension:false,
    TipoPension:{}
  };
  popupVisible:boolean=false;
  constructor(private http:HttpClient) {}

  ngOnInit(): void {

    let data = JSON.stringify({
      "headers": {
        "normalizedNames": {},
        "lazyUpdate": null
      }
    });
    
    let config = {
      method: 'post',
      url: 'https://somosemipreapi.azurewebsites.net/api/interface/gettipodocs',
      headers: { 
        'Connection': 'keep-alive', 
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Microsoft Edge";v="99"', 
        'Accept': 'application/json, text/plain, */*', 
        'Content-Type': 'application/json', 
        'sec-ch-ua-mobile': '?0', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
        'sec-ch-ua-platform': '"Windows"', 
        'Origin': 'https://webhcedev.azurewebsites.net', 
        'Sec-Fetch-Site': 'cross-site', 
        'Sec-Fetch-Mode': 'cors', 
        'Sec-Fetch-Dest': 'empty', 
        'Referer': 'https://webhcedev.azurewebsites.net/', 
        'Accept-Language': 'es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5', 
        'Cookie': 'ARRAffinity=70e38c1ed72db5f7ffb204484a71ad78c423ea1a8a3bd749fefcc9c77560a9e4; ARRAffinitySameSite=70e38c1ed72db5f7ffb204484a71ad78c423ea1a8a3bd749fefcc9c77560a9e4'
      },
      data : data
    };
    this.http.post<ResponseData>('https://somosemipreapi.azurewebsites.net/api/interface/gettipodocs'
    ,config.headers)
    .subscribe( response=>{
      this.owners=response.data.titular;
    }, error=>{
      console.log(error)
    })
    
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.fetching=true;
    let {documento,tipo}=this.formData

    let data = JSON.stringify({documento, tipo});
    
    let config = {
      method: 'post',
      url: 'https://somosemipreapi.azurewebsites.net/api/interface/NombresMarketPlace',
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'ARRAffinity=70e38c1ed72db5f7ffb204484a71ad78c423ea1a8a3bd749fefcc9c77560a9e4;'
      },
      body : data
    };

    this.http.post<ResponseValidation>('https://somosemipreapi.azurewebsites.net/api/interface/NombresMarketPlace',data,config)
    .subscribe((response)=>{
      if(response.Codigo===0){
        notify(response.Mensaje, 'error', 3000);
      }else{
        this.user=response.Retorno;
        this.popupVisible=true;
        notify('Usuario encontrado','success',3000);
      }
      this.fetching=false
    },(error)=>{
      this.fetching=false
      notify('No se ha podido conectar con el servidor', 'error', 3000);
    })
    
  }

  fullname(): string {
    return `${this.user.PrimerNombre} ${this.user.SegundoNombre} ${this.user.PrimerApellido} ${this.user.SegundoApellido}`
  }
}
