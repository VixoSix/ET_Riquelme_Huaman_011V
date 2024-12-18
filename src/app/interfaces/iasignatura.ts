import { Horario } from "./horario";

//GET
export interface IAsignatura {
    id:string,
    nombre:string,
    sigla:string,
    sala:string,
    seccionId:string,
    profesorId:number,
    alumnoId:string[],
    horarios:Horario[],
}

export interface ISeccion {
    id:string,
    seccion:string
}