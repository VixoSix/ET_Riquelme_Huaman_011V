//POST
export interface Iasistencia {
    id:string,
    profesorId:number,
    asignaturaId:number,
    alumnoId:number,
    rut:string,
    nombre:string,
    fecha:string,
    asistio:boolean
}

export interface Iasistencias {
    id:string,
    profesorId:number,
    asignaturaId:number,
    alumnoId:number,
    rut:string,
    nombre:string,
    fecha:string,
    asistio:boolean
}
