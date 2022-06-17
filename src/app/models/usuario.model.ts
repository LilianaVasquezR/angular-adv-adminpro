
export class Usuario {

    constructor(
       
       public nombre: string,
       public email: string,
       public password?: string,
       public img?: string,//opcional lo marca ?
       public google?: boolean,//opcional
       public role?: string,//opcional
       public uid?: string,//opcional
    ) {}


}