 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from './../../Models/Grupo';

export default class GruposController {
    public async setRegistrarGrupo({request,response}:HttpContextContract) {
        try {
        const dataGrupo =request.only(['codigo_grupo','nombre_grupo' ]) 
        const codigoGrupo =dataGrupo.codigo_grupo;
        const codigoGrupoExistente =await this.getValidarGrupoExistente(codigoGrupo)
        if (codigoGrupoExistente===0) {
            await Grupo.create(dataGrupo)
            response.status(200).json({"msg":"Registro completado con exito"})
            
        } else {
            response.status(400).json({"msg":"Error , el codigo usuario ya se encuentra registrado"})
            
        }
    } catch (e) {
        
        response.status(500).json({"msg":"Error , en el servidor!!"})
    }
    }
    private async getValidarGrupoExistente(codigo_perfil:Number):Promise<Number> {
        const total = await Grupo.query().where({"codigo_perfil":codigo_perfil}).count('*').from('grupos')
        return parseInt(total[0]["count(*)"])
    }
}
