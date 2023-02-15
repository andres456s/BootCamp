 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuarioGrupo from './../../Models/UsuarioGrupo';
import Grupo from './../../Models/Grupo';

export default class GrupoUsuariosController {

    public async setRegistrarUsuarioGrupo({request,response}:HttpContextContract) {
        try {
        const dataGrupoUsuario =request.only([
            'codigo_usuario','codigo_grupo','fecha_inicio'
        ]) 
        const codigoUsuario =dataGrupoUsuario.codigo_usuario;
        const codigoGrupo =dataGrupoUsuario.codigo_grupo;
        const datosExistentes:Number =await this.getValidarDatosGrupoYUsuario(codigoGrupo,codigoUsuario)
        switch (datosExistentes) {
            case 0:
                await UsuarioGrupo.create(dataGrupoUsuario)
                response.status(200).json({"msg":"Registro completado con exito"})
                break;
            case 1:
                response.status(400).json({"msg":"Error , el codigo usuario ya se encuentra registrado"})
                break;
                case 2:
                response.status(400).json({"msg":"Error , el codigo grupo ya se encuentra registrado"})
                break;
        }
    } catch (e) {
        console.log(Error)
        response.status(500).json({"msg":"Error , en el servidor!!"})
    }
    }
    private async getValidarDatosGrupoYUsuario(codigo_grupo:Number,codigo_usuario:Number):Promise<Number> {
        let total = await Grupo.query().where({"codigo_grupo":codigo_grupo}).count('*').from('grupos')
        let cantidadDatos= parseInt(total[0]["count(*)"])
        if (cantidadDatos !==0) {
             total = await Grupo.query().where({"codigo_usuario":codigo_usuario}).count('*').from('usuarios')
             cantidadDatos= parseInt(total[0]["count(*)"])
            if (cantidadDatos !==0) {
                return 0;
                
            } else {
                
                return 2;
            }
        } else {
            return 1;
        }
    }
}
