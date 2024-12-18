export interface IQrsGenerado {
    id:string,
    idAsistencia: string,
    idProfesor: number,
    idAsignatura:number,
    idAlumno: string,
    rut: string,
    nombre:string,
    fechaAsistencia: string,
    asistio: boolean,
    qr: string
}

export interface IQrsGenerados {
    id:string,
    idAsistencia: string,
    idProfesor: number,
    idAsignatura:number,
    idAlumno: string,
    rut: string,
    nombre:string,
    fechaAsistencia: string,
    asistio: boolean,
    qr: string
}
