 import { Request } from '@adonisjs/core/build/standalone';
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

public async getConsultarAnimales():Promise<Animal[]> {
    const animal =await Animal.all()
    return animal;
}
public async getConsultaPorEspecie({request}:HttpContextContract) {
    const especie= request.param('especie');
    const animal = await Animal.query().where('Especie',especie)
    return animal;
}

public async getConsultaPorMenora8():Promise<Animal[]> {
    const animal = await Animal.query().where('edad','>','8')
    return animal;
}

public async setModificarAnimales({request}:HttpContextContract) {
    const id = request.param('id');
    const animal = request.all();
    await Animal.query().where('codigo_animal',id).update({
        nombre_animal:animal.nombre_animal,
        Especie:animal.Especie,
        Raza:animal.Raza,
        Genero:animal.Genero,
        edad:animal.edad,
    });
    return("Registro actualizado") ;
}

public async setEliminaReigstro({request}:HttpContextContract) {
    const id =request.param('id');
    await Animal.query().where('codigo_animal',id).delete();
    return ('usuario eliminado')
}
}
