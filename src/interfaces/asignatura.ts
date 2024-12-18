export interface Asignaturas{
    id:string;
    nombre:string,
    sigla:string,
    sala:string,
    seccionId:string,
    profesorId:number,
    alumnoId:string[],
    horarios:Horario[],
}


export interface Horario {
    dia: string;
    horaInicio: string;
    horaFin: string;
  }

export interface Asistencias{
    id:string
    profesorId:string;
    asignaturaId:string;
    alumnoId:string;
    nombre:string
    fecha:string
    asistio:boolean
}

export interface Justificacion{
    id:string
    profesorId:string;
    asignaturaId:string;
    alumnoId:string
    nombre:string
    fecha:string
    asistio:boolean;
    justificatorio:string;
    descripcion:string;
    comentario?:string;
}