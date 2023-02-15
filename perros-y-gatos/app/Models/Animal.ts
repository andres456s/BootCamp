import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Animal extends BaseModel {
  @column({ isPrimary: true }) public codigo_animal: number
  @column() public nombre_animal: string
  @column() public Especie: number
  @column() public Raza: number
  @column() public Genero: number
  @column() public edad: number
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
