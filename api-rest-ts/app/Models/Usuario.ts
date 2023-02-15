import { DateTime } from 'luxon'
import { BaseModel, column ,hasOne,HasOne,HasMany,hasMany,ManyToMany,manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil';
import Grupo from './Grupo';
import Publicacione from './Publicacione';

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ isPrimary: true }) public codigo_usuario:number
  @column() public nombre_usuario:string
  @column() public contrasena:string
  @column() public email:string
  @column() public telefono:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne( () => Perfil, {
    localKey:'codigo_usuario',
    foreignKey:'codigo_usuario',
  })
  public perfil :HasOne<typeof Perfil>
  @hasMany( () => Publicacione, {
    localKey:'codigo_usuario',
    foreignKey:'codigo_usuario',
  })
  public publicaciones :HasMany<typeof Publicacione>
 
  @manyToMany( () => Grupo, {
    localKey:'codigo_usuario',
    pivotForeignKey:'codigo_usuario',
    relatedKey:'codigo_grupo',
    pivotRelatedForeignKey:'codigo_grupo',
    pivotTable:'codigo_grupos',
  })
  public usuario_grupos :ManyToMany<typeof Grupo>
}
