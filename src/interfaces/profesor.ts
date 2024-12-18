export interface Profesor {
    id:string,
    nombre:string,
    apellido:string,
    usuario:string,
    correo:string,
    contrasenia:string,
    codigo_recuperacion:string,
    imagen:string
    isactive:boolean;
}

export interface ProfesorNuevo{
    nombre:string;
    apellido:string;
    usuario:string;
    correo:string;
    contrasenia:string;
    codigo_recuperacion:string,
    imagen?:string;
    isactive: boolean;
}