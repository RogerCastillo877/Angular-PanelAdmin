import { Hospital } from './hospital.model';
interface _HospitalUser {
    _id: string;
    name: string;
    img: string;
}

export class Doctor {

    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _HospitalUser,
        public hospital?: Hospital
    ) {}
}