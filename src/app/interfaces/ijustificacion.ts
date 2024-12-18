//POST
export interface Ijustificacion {
    id: string,
    profesorId:number,
    asignaturaId:number,
    alumnoId:number,
    nombre:string,
    fecha:string,
    asistio:boolean,
    justificatorio:string, //Imagen
    descripcion:string,
    comentario:string
}

//GET, PUT, DELETE
export interface Ijustificaciones {
    id: string,
    profesorId:number,
    asignaturaId:number,
    alumnoId:number,
    nombre:string,
    fecha:string,
    asistio:boolean,
    justificatorio:string, //Imagen
    descripcion:string,
    comentario:string
}
