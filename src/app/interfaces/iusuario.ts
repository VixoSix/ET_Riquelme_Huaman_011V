//POST
export interface IUsuario {
    id: string,
    nombre:string,
    apellido:string,
    correo:string,
    usuario:string,
    contrasenia:string,
    rut:string,
    imagen:string,
    isactive:boolean,
    codigo_recuperacion:string;
}

//GET y PUT
export interface IUsuarios {
    id: string,
    nombre:string,
    apellido:string,
    correo:string,
    usuario:string,
    contrasenia:string,
    rut:string,
    imagen:string ,
    isactive:boolean,
    codigo_recuperacion:string;
}
