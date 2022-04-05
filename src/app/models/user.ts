export interface User {
    TipoDocumento: string;
    NumeroDocumento:string
    PrimerNombre:string;
    SegundoNombre:string;
    PrimerApellido:string;
    SegundoApellido:string;
    CodigoEps:string;
    NombreEps:string;
    FechaAfiliacionEps:string;
    CertificadoEps: boolean,
    TipoCotizante:string;
    ValorUPC:number;
    CodigoAfp:any;
    NombreAfp:any;
    FechaAfiliacionAfp:any;
    CertificadoAfp:boolean;
    EsPensionado:boolean;
    EnTramitePension:boolean;
    TipoPension:any;
}
