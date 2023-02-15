 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal';

export default class AnimalsController {

    public async setRegistrarAnimals({request,response}:HttpContextContract) {
    const dataAnimal =request.only([
        'codigo_animal','nombre_animal','Especie',
        'Raza','Genero','edad'
    ]) 
try {
    const codigoAnimal =dataAnimal.codigo_animal;
    const animalExistente:Number =await this.getValidarAnimalExistente(codigoAnimal)
    if (animalExistente==0) {
        await Animal.create(dataAnimal)
        response.status(200).json({"msg":"Registro completado con exito"})
        
    } else {
        response.status(400).json({"msg":"Error , el codigo usuario ya se encuentra registrado"})
        
    }
} catch (e) {
    console.log(e);
    
    response.status(500).json({"msg":"Error , en el servidor!!"})
}
}
private async getValidarAnimalExistente(codigo_animal:Number):Promise<Number> {
    const total = await Animal.query().where({"codigo_animal":codigo_animal}).count('*').from('Animals')
    return parseInt(total[0]["count(*)"])
}
}
