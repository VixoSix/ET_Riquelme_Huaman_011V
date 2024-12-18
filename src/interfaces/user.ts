import { Asignaturas } from "./asignatura";

export interface Users{
    id:string;
    username:string;
    nombre:string;
    apellido:string;
    email:string;
    password:string;
    isactive:boolean;
    asignaturas: Asignaturas[];
    imagen:string;
}

export interface UserNuevo{
    username:string;
    nombre:string;
    apellido:string;
    email:string;
    password:string;
    isactive: boolean;
    imagen?:string;
}