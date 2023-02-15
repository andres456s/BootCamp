 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from './../../Models/Perfil';

export default class PerfilsController {
    public async setRegistrarPerfil({request,response}:HttpContextContract) {
        try {
        const dataPerfil =request.only([
            'codigo_perfil','codigo_usuario','nombre_perfil','fecha_creacion'
        ]) 
        const codigoPerfil =dataPerfil.codigo_perfil;
        const codigoPerfilExistente:Number =await this.getValidarPerfilExistente(codigoPerfil)
        if (codigoPerfilExistente===0) {
            await Perfil.create(dataPerfil)
            response.status(200).json({"msg":"Registro completado con exito"})
            
        } else {
            response.status(400).json({"msg":"Error , el codigo usuario ya se encuentra registrado"})
            
        }
    } catch (e) {
        
        response.status(500).json({"msg":"Error , en el servidor!!"})
    }
    }
    private async getValidarPerfilExistente(codigo_perfil:Number):Promise<Number> {
        const total = await Perfil.query().where({"codigo_perfil":codigo_perfil}).count('*').from('perfils')
        return parseInt(total[0]["count(*)"])
    }
}
