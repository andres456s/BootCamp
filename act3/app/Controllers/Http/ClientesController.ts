import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from './../../Models/Cliente';
export default class ClientesController {
public async setRegistrarClientes({request,response}:HttpContextContract) {
const dataCliente=request.only(['cedula','nombre','apellido','telefono','correo'])
try {
    const cedulaCliente=dataCliente.cedula;
    const clienteExistente:number=await this.getValidarClienteExistente(cedulaCliente);
    console.log(clienteExistente);
    if (clienteExistente===0) {
        await Cliente.create(dataCliente);
        response.status(200).json({"msg":"Registro completo con exito"});
        
    } else {
        response.status(400).json({"msg":"Error cedula Existente"});
        
    }
} catch (e) {
    console.log(e);
    response.status(500).json({"msg":"Error En el Servidor"});
}
    
}
    private async getValidarClienteExistente(cedula : number): Promise<number> {
        const total= await Cliente.query().where({'cedula':cedula})
        return total.length
    }
    public async getListarClientes():Promise<Cliente[]> {
        const clientes =await Cliente.all();
        return clientes;
    }

    public async actualizarClientes({request}:HttpContextContract) {

        const cedula =request.param('id');
        console.log(cedula);
        const cliente =await Cliente.findOrFail(cedula)
        const datos= request.all()
        cliente.nombre=datos.nombre,
        cliente.apellido=datos.apellido,
        cliente.telefono=datos.telefono,
        cliente.correo=datos.correo,
        await cliente.save()
        return({"mensage":"A Actualizado correctamente","estado":200});
    }
    
    public async eliminarCliente({request}:HttpContextContract) {
        const id =request.param('id');
        await Cliente.query().where('cedula',id).delete();
        return({"mensage":"A Eliminado correctamente","estado":200});
        
        
    }

}

