interface _HospitalUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {
    constructor(
        public nombre: string,
        public img: string,
        public _id?: string,
        public usuario?: _HospitalUser,
        
    ) {}
}


// se agrego Hospitalinterface 

export interface HospitalInterface {
    ok: boolean;
    hospitales: Hospital[];
    uid: string;
}



