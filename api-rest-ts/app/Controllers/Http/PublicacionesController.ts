 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicaciones from'app/Models/Publicacione'

export default class PublicacionesController {
    public async setRegistrarPublicacion({request,response}:HttpContextContract) {
        try {
        const dataPublicaciones =request.only([
            'codigo_publicacion','codigo_usuario','titulo','cuerpo'
        ]) 
        const codigoPublicacion =dataPublicaciones.codigo_publicacion;
        const codigoPublicacionExistente:Number =await this.getValidarPublicacionExistente(codigoPublicacion)
        if (codigoPublicacionExistente==0) {
            await Publicaciones.create(dataPublicaciones)
            response.status(200).json({"msg":"Registro completado con exito"})
            
        } else {
            response.status(400).json({"msg":"Error , el codigo usuario ya se encuentra registrado"})
            
        }
    } catch (e) {
        
        response.status(500).json({"msg":"Error , en el servidor!!"})
    }
    }
    private async getValidarPublicacionExistente(codigo_publicacion:Number):Promise<Number> {
        const total = await Publicaciones.query().where({"codigo_publicacion":codigo_publicacion}).count('*').from('publicaciones')
        return parseInt(total[0]["count(*)"])
    }
}
