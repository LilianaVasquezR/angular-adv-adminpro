import { Hospital } from "./hospital.model";

interface _MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Medico {

    constructor(
        public nombre: string,
        public img: string,
        public _id?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital
        
    ) {}
}

// se agrego Hospitalinterface 

export interface MedicoInterface {
    ok: boolean;
    medicos: Medico[];
    uid: string;
}


export interface MedicoPorIdInterface {
    ok: boolean;
    medico: Medico;
    uid: string;
}

