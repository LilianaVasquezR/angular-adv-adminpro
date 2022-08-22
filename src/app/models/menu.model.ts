  
export class Menu {

    constructor( 
        public titulo:string,
        public icono:string,
        public submenu:submenu[]
    ){} 
}

export class submenu{
    constructor(
        public titulo:string,
        public url:string
    ){}
}